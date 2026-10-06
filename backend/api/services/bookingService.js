'use strict';

const crypto = require('crypto');
const mongoose = require('mongoose');

const Appointment = mongoose.model('bookingAppointments');
const Master = mongoose.model('masters');
const Service = mongoose.model('services');

const BUSINESS_TIMEZONE = process.env.BUSINESS_TIMEZONE || 'Asia/Yerevan';
const BOOKING_HORIZON_DAYS = 30;
const SLOT_INTERVAL_MINUTES = 30;

const SERVICE_DURATIONS = Object.freeze({
  'МУЖСКАЯ СТРИЖКА': 60,
  'СТРИЖКА + БОРОДА': 90,
  'КОРЕКЦИЯ БОРОДЫ': 30,
  'КОРОЛЕВСКОЕ БРИТЬЕ': 60,
  'ДЕТСКАЯ СТРИЖКА': 60,
  'УДАЛЕНИЕ ВОЛОС ГОРЯЧИМ ВОСКОМ': 30,
  'КАМУФЛЯЖ СЕДИНЫ': 60
});

const WEEKLY_HOURS = Object.freeze({
  0: { start: '09:00', end: '13:00' },
  1: { start: '09:00', end: '17:00' },
  2: { start: '09:00', end: '17:00' },
  3: { start: '09:00', end: '17:00' },
  4: { start: '09:00', end: '17:00' },
  5: { start: '09:00', end: '17:00' },
  6: { start: '09:00', end: '15:00' }
});

// The recovered records have no scheduling fields, so this deliberately small
// metadata layer supplies deterministic days off and service eligibility.
const MASTER_POLICIES = Object.freeze({
  'Ryan Printz': { dayOff: 0, excludedServices: [] },
  'Steve Martin': { dayOff: 1, excludedServices: ['КОРОЛЕВСКОЕ БРИТЬЕ'] },
  'Bruce Sam': { dayOff: 2, excludedServices: ['УДАЛЕНИЕ ВОЛОС ГОРЯЧИМ ВОСКОМ'] },
  'Mark Smith': { dayOff: 3, excludedServices: ['ДЕТСКАЯ СТРИЖКА'] },
  'Andrew John': { dayOff: 4, excludedServices: ['КАМУФЛЯЖ СЕДИНЫ'] },
  'AKevin Benny': { dayOff: 5, excludedServices: ['СТРИЖКА + БОРОДА'] }
});

const DAY_NAMES = Object.freeze({
  0: 'Вс',
  1: 'Пн',
  2: 'Вт',
  3: 'Ср',
  4: 'Чт',
  5: 'Пт',
  6: 'Сб'
});

function bookingError(status, code, message, fields) {
  const error = new Error(message);
  error.status = status;
  error.code = code;
  if (fields) {
    error.fields = fields;
  }
  return error;
}

function normalizeNameKey(value) {
  return String(value || '').trim().replace(/\s+/g, ' ').toUpperCase();
}

function getServiceDuration(service) {
  return SERVICE_DURATIONS[normalizeNameKey(service && service.name)] || null;
}

function getMasterPolicy(master) {
  return MASTER_POLICIES[String(master && master.name || '').trim()] || {
    dayOff: null,
    excludedServices: []
  };
}

function isServiceEligible(master, service) {
  const policy = getMasterPolicy(master);
  return policy.excludedServices.indexOf(normalizeNameKey(service.name)) === -1;
}

function parseDate(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(value || ''));
  if (!match) {
    throw bookingError(400, 'INVALID_DATE', 'Укажите дату в формате ГГГГ-ММ-ДД.', { date: 'Некорректная дата.' });
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const parsed = new Date(Date.UTC(year, month - 1, day));
  if (
    parsed.getUTCFullYear() !== year ||
    parsed.getUTCMonth() !== month - 1 ||
    parsed.getUTCDate() !== day
  ) {
    throw bookingError(400, 'INVALID_DATE', 'Укажите существующую календарную дату.', { date: 'Некорректная дата.' });
  }

  return parsed;
}

function formatUtcDate(date) {
  return [
    date.getUTCFullYear(),
    String(date.getUTCMonth() + 1).padStart(2, '0'),
    String(date.getUTCDate()).padStart(2, '0')
  ].join('-');
}

function addDays(date, days) {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + days));
}

function zonedParts(instant) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: BUSINESS_TIMEZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23'
  }).formatToParts(instant);

  return parts.reduce(function (result, part) {
    if (part.type !== 'literal') {
      result[part.type] = Number(part.value);
    }
    return result;
  }, {});
}

function todayInBusinessTimezone(now) {
  const parts = zonedParts(now || new Date());
  return [
    parts.year,
    String(parts.month).padStart(2, '0'),
    String(parts.day).padStart(2, '0')
  ].join('-');
}

function timezoneOffsetMs(instant) {
  const parts = zonedParts(instant);
  return Date.UTC(
    parts.year,
    parts.month - 1,
    parts.day,
    parts.hour,
    parts.minute,
    parts.second
  ) - instant.getTime();
}

function zonedDateTimeToUtc(date, minuteOfDay) {
  const parsed = parseDate(date);
  const hour = Math.floor(minuteOfDay / 60);
  const minute = minuteOfDay % 60;
  const localAsUtc = Date.UTC(
    parsed.getUTCFullYear(),
    parsed.getUTCMonth(),
    parsed.getUTCDate(),
    hour,
    minute,
    0
  );

  let candidate = new Date(localAsUtc - timezoneOffsetMs(new Date(localAsUtc)));
  candidate = new Date(localAsUtc - timezoneOffsetMs(candidate));
  const parts = zonedParts(candidate);

  if (
    parts.year !== parsed.getUTCFullYear() ||
    parts.month !== parsed.getUTCMonth() + 1 ||
    parts.day !== parsed.getUTCDate() ||
    parts.hour !== hour ||
    parts.minute !== minute
  ) {
    throw bookingError(400, 'INVALID_LOCAL_TIME', 'Выбранное местное время недоступно.');
  }

  return candidate;
}

function timeToMinutes(value) {
  const match = /^([01]\d|2[0-3]):([0-5]\d)$/.exec(String(value || ''));
  if (!match) {
    return null;
  }
  return Number(match[1]) * 60 + Number(match[2]);
}

function minutesToTime(value) {
  return String(Math.floor(value / 60)).padStart(2, '0') + ':' + String(value % 60).padStart(2, '0');
}

function validateBookingDate(value, now) {
  const requested = parseDate(value);
  const todayText = todayInBusinessTimezone(now);
  const today = parseDate(todayText);
  const maxDate = addDays(today, BOOKING_HORIZON_DAYS);

  if (requested < today) {
    throw bookingError(400, 'DATE_IN_PAST', 'Нельзя записаться на прошедшую дату.', { date: 'Выберите сегодняшнюю или будущую дату.' });
  }
  if (requested > maxDate) {
    throw bookingError(400, 'DATE_OUT_OF_RANGE', 'Запись доступна не более чем на 30 дней вперёд.', { date: 'Дата вне доступного периода.' });
  }

  return {
    parsed: requested,
    today: todayText,
    maxDate: formatUtcDate(maxDate)
  };
}

function masterScheduleForDate(master, dateValue) {
  const day = parseDate(dateValue).getUTCDay();
  const policy = getMasterPolicy(master);
  if (policy.dayOff === day) {
    return null;
  }
  return WEEKLY_HOURS[day];
}

function weeklySchedule(master) {
  const policy = getMasterPolicy(master);
  return [1, 2, 3, 4, 5, 6, 0].map(function (day) {
    const hours = WEEKLY_HOURS[day];
    return {
      dayOfWeek: day,
      label: DAY_NAMES[day],
      isWorking: policy.dayOff !== day,
      start: policy.dayOff === day ? null : hours.start,
      end: policy.dayOff === day ? null : hours.end
    };
  });
}

function buildMasterResult(master, services) {
  const eligibleServiceIds = services.filter(function (service) {
    return isServiceEligible(master, service);
  }).map(function (service) {
    return String(service._id);
  });

  return {
    id: String(master._id),
    name: master.name,
    position: master.position,
    imgsrc: master.imgsrc,
    active: true,
    bookable: true,
    eligibleServiceIds: eligibleServiceIds,
    weeklySchedule: weeklySchedule(master)
  };
}

async function loadBookableEntities(serviceId, masterId) {
  if (!mongoose.Types.ObjectId.isValid(serviceId)) {
    throw bookingError(400, 'INVALID_SERVICE', 'Указана некорректная услуга.', { serviceId: 'Некорректный идентификатор.' });
  }
  if (!mongoose.Types.ObjectId.isValid(masterId)) {
    throw bookingError(400, 'INVALID_MASTER', 'Указан некорректный мастер.', { masterId: 'Некорректный идентификатор.' });
  }

  const results = await Promise.all([
    Service.findById(serviceId).lean(),
    Master.findById(masterId).lean()
  ]);
  const service = results[0];
  const master = results[1];

  if (!service || !getServiceDuration(service)) {
    throw bookingError(404, 'SERVICE_NOT_BOOKABLE', 'Эта услуга недоступна для онлайн-записи.');
  }
  if (!master || !MASTER_POLICIES[String(master.name || '').trim()]) {
    throw bookingError(404, 'MASTER_NOT_BOOKABLE', 'Этот мастер недоступен для онлайн-записи.');
  }
  if (!isServiceEligible(master, service)) {
    throw bookingError(400, 'SERVICE_NOT_OFFERED', 'Выбранный мастер не выполняет эту услугу.');
  }

  return { service: service, master: master };
}

async function getOptions(now) {
  // Constructing a formatter also validates a configured IANA timezone.
  try {
    zonedParts(now || new Date());
  } catch (error) {
    throw bookingError(503, 'BOOKING_CONFIGURATION_ERROR', 'Онлайн-запись временно недоступна.');
  }

  const results = await Promise.all([
    Service.find({}).sort({ _id: 1 }).lean(),
    Master.find({}).sort({ _id: 1 }).lean()
  ]);
  const services = results[0].filter(function (service) {
    return Boolean(getServiceDuration(service));
  });
  const masters = results[1].filter(function (master) {
    return Boolean(MASTER_POLICIES[String(master.name || '').trim()]);
  });
  const today = todayInBusinessTimezone(now);

  return {
    timezone: BUSINESS_TIMEZONE,
    slotIntervalMinutes: SLOT_INTERVAL_MINUTES,
    horizonDays: BOOKING_HORIZON_DAYS,
    today: today,
    maxDate: formatUtcDate(addDays(parseDate(today), BOOKING_HORIZON_DAYS)),
    services: services.map(function (service) {
      return {
        id: String(service._id),
        name: service.name,
        price: service.price,
        durationMinutes: getServiceDuration(service),
        active: true,
        bookable: true
      };
    }),
    masters: masters.map(function (master) {
      return buildMasterResult(master, services);
    })
  };
}

function buildLockKeys(date, startMinute, endMinute) {
  const keys = [];
  for (let minute = startMinute; minute < endMinute; minute += 1) {
    keys.push(date + ':' + minute);
  }
  return keys;
}

async function getAvailability(input, now) {
  const dateState = validateBookingDate(input.date, now);
  const entities = await loadBookableEntities(input.serviceId, input.masterId);
  const duration = getServiceDuration(entities.service);
  const schedule = masterScheduleForDate(entities.master, input.date);
  const base = {
    timezone: BUSINESS_TIMEZONE,
    date: input.date,
    service: {
      id: String(entities.service._id),
      name: entities.service.name,
      durationMinutes: duration
    },
    master: {
      id: String(entities.master._id),
      name: entities.master.name
    },
    slotIntervalMinutes: SLOT_INTERVAL_MINUTES
  };

  if (!schedule) {
    return Object.assign(base, {
      available: false,
      reason: 'MASTER_NOT_WORKING',
      schedule: null,
      slots: []
    });
  }

  const appointments = await Appointment.find({
    master: entities.master._id,
    date: input.date,
    status: { $ne: 'cancelled' }
  }).select('+lockKeys').lean();
  const occupied = new Set();
  appointments.forEach(function (appointment) {
    (appointment.lockKeys || []).forEach(function (key) {
      occupied.add(key);
    });
  });

  const startOfShift = timeToMinutes(schedule.start);
  const endOfShift = timeToMinutes(schedule.end);
  const current = now || new Date();
  const slots = [];

  for (let start = startOfShift; start + duration <= endOfShift; start += SLOT_INTERVAL_MINUTES) {
    const end = start + duration;
    const startAt = zonedDateTimeToUtc(input.date, start);
    if (input.date === dateState.today && startAt <= current) {
      continue;
    }
    const lockKeys = buildLockKeys(input.date, start, end);
    if (lockKeys.some(function (key) { return occupied.has(key); })) {
      continue;
    }
    slots.push({
      start: minutesToTime(start),
      end: minutesToTime(end)
    });
  }

  return Object.assign(base, {
    available: slots.length > 0,
    reason: slots.length > 0 ? null : 'FULLY_BOOKED',
    schedule: schedule,
    slots: slots
  });
}

function validateText(value, field, minimum, maximum, required) {
  if (typeof value !== 'string') {
    throw bookingError(400, 'VALIDATION_ERROR', 'Проверьте данные формы.', { [field]: 'Ожидается текст.' });
  }
  const normalized = value.trim().replace(/[ \t]+/g, ' ');
  if ((required && normalized.length < minimum) || normalized.length > maximum || /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/.test(normalized)) {
    throw bookingError(400, 'VALIDATION_ERROR', 'Проверьте данные формы.', { [field]: 'Недопустимая длина или символы.' });
  }
  return normalized;
}

function normalizePhone(value) {
  if (typeof value !== 'string') {
    throw bookingError(400, 'VALIDATION_ERROR', 'Проверьте номер телефона.', { phone: 'Ожидается номер телефона.' });
  }
  const raw = value.trim();
  if (!/^[+\d\s().-]+$/.test(raw)) {
    throw bookingError(400, 'VALIDATION_ERROR', 'Проверьте номер телефона.', { phone: 'Используйте только цифры и телефонные разделители.' });
  }
  const digits = raw.replace(/\D/g, '');
  if (digits.length < 7 || digits.length > 15) {
    throw bookingError(400, 'VALIDATION_ERROR', 'Проверьте номер телефона.', { phone: 'Номер должен содержать от 7 до 15 цифр.' });
  }
  return '+' + digits;
}

function validateCreatePayload(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    throw bookingError(400, 'VALIDATION_ERROR', 'Тело запроса должно быть объектом.');
  }
  const allowed = ['serviceId', 'masterId', 'date', 'startTime', 'name', 'phone', 'comment'];
  const unknown = Object.keys(body).filter(function (key) { return allowed.indexOf(key) === -1; });
  if (unknown.length > 0) {
    throw bookingError(400, 'VALIDATION_ERROR', 'Запрос содержит неизвестные поля.', { request: 'Удалите неизвестные поля: ' + unknown.join(', ') });
  }
  if (typeof body.serviceId !== 'string' || typeof body.masterId !== 'string' || typeof body.date !== 'string' || typeof body.startTime !== 'string') {
    throw bookingError(400, 'VALIDATION_ERROR', 'Выберите услугу, мастера, дату и время.');
  }
  if (timeToMinutes(body.startTime) === null || timeToMinutes(body.startTime) % SLOT_INTERVAL_MINUTES !== 0) {
    throw bookingError(400, 'INVALID_TIME', 'Выберите время из доступных слотов.', { startTime: 'Некорректное время.' });
  }

  return {
    serviceId: body.serviceId,
    masterId: body.masterId,
    date: body.date,
    startTime: body.startTime,
    name: validateText(body.name, 'name', 2, 80, true),
    phone: normalizePhone(body.phone),
    comment: body.comment === undefined ? '' : validateText(body.comment, 'comment', 0, 500, false)
  };
}

function validateIdempotencyKey(value) {
  if (typeof value !== 'string' || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value)) {
    throw bookingError(400, 'INVALID_IDEMPOTENCY_KEY', 'Заголовок Idempotency-Key должен содержать UUID v4.');
  }
  return value.toLowerCase();
}

function digest(prefix, value) {
  return crypto.createHash('sha256').update(prefix, 'utf8').update(value, 'utf8').digest('hex');
}

function publicAppointment(appointment) {
  return {
    id: String(appointment._id),
    service: {
      id: String(appointment.service),
      name: appointment.serviceName,
      durationMinutes: appointment.durationMinutes
    },
    master: {
      id: String(appointment.master),
      name: appointment.masterName
    },
    clientName: appointment.clientName,
    date: appointment.date,
    startTime: appointment.startTime,
    endTime: appointment.endTime,
    status: appointment.status,
    createdAt: appointment.createdAt
  };
}

async function resolveIdempotent(idempotencyKeyHash, requestHash) {
  const existing = await Appointment.findOne({ idempotencyKeyHash: idempotencyKeyHash })
    .select('+requestHash')
    .lean();
  if (!existing) {
    return null;
  }
  if (existing.requestHash !== requestHash) {
    throw bookingError(409, 'IDEMPOTENCY_CONFLICT', 'Этот ключ повторной отправки уже использован для другой записи.');
  }
  return {
    replayed: true,
    appointment: publicAppointment(existing)
  };
}

async function createAppointment(body, idempotencyKey, now) {
  const data = validateCreatePayload(body);
  const normalizedKey = validateIdempotencyKey(idempotencyKey);
  const idempotencyKeyHash = digest('hairy-booking-key\0', normalizedKey);
  const requestHash = digest('hairy-booking-request\0', JSON.stringify(data));
  const replay = await resolveIdempotent(idempotencyKeyHash, requestHash);
  if (replay) {
    return replay;
  }

  const availability = await getAvailability({
    serviceId: data.serviceId,
    masterId: data.masterId,
    date: data.date
  }, now);
  const slot = availability.slots.find(function (candidate) {
    return candidate.start === data.startTime;
  });
  if (!slot) {
    throw bookingError(409, 'SLOT_TAKEN', 'Выбранное время уже занято или недоступно. Обновите список слотов.');
  }

  const startMinute = timeToMinutes(slot.start);
  const endMinute = timeToMinutes(slot.end);
  const appointment = new Appointment({
    service: availability.service.id,
    master: availability.master.id,
    serviceName: availability.service.name,
    masterName: availability.master.name,
    clientName: data.name,
    normalizedPhone: data.phone,
    comment: data.comment,
    date: data.date,
    startTime: slot.start,
    endTime: slot.end,
    startAt: zonedDateTimeToUtc(data.date, startMinute),
    endAt: zonedDateTimeToUtc(data.date, endMinute),
    durationMinutes: availability.service.durationMinutes,
    status: 'confirmed',
    lockKeys: buildLockKeys(data.date, startMinute, endMinute),
    idempotencyKeyHash: idempotencyKeyHash,
    requestHash: requestHash
  });

  try {
    const saved = await appointment.save();
    return {
      replayed: false,
      appointment: publicAppointment(saved)
    };
  } catch (error) {
    if (error && (error.code === 11000 || String(error.message || '').indexOf('E11000') !== -1)) {
      const idempotentWinner = await resolveIdempotent(idempotencyKeyHash, requestHash);
      if (idempotentWinner) {
        return idempotentWinner;
      }
      throw bookingError(409, 'SLOT_TAKEN', 'Это время только что занял другой клиент. Выберите новый слот.');
    }
    throw error;
  }
}

module.exports = {
  BUSINESS_TIMEZONE: BUSINESS_TIMEZONE,
  BOOKING_HORIZON_DAYS: BOOKING_HORIZON_DAYS,
  SLOT_INTERVAL_MINUTES: SLOT_INTERVAL_MINUTES,
  createAppointment: createAppointment,
  getAvailability: getAvailability,
  getOptions: getOptions
};
