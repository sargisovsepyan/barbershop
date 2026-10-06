'use strict';

const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const { after, before, test } = require('node:test');
const { spawn } = require('node:child_process');
const path = require('node:path');
const mongoose = require('mongoose');

const TEST_PORT = 3101;
const TEST_DATABASE = 'barbershop_booking_test';
const TEST_URI = 'mongodb://127.0.0.1:27018/' + TEST_DATABASE;
const API = 'http://127.0.0.1:' + TEST_PORT;

const ids = {
  haircut: '5dbb7e1c85c1ae070cb6e368',
  combo: '5dbb7e3985c1ae070cb6e369',
  beard: '5dbb7ed685c1ae070cb6e36c',
  shave: '5dbb7f1885c1ae070cb6e36d',
  kids: '5dbb7f5e85c1ae070cb6e36e',
  wax: '5dbb7f9185c1ae070cb6e36f',
  gray: '5dbb7fa385c1ae070cb6e370',
  ryan: '5dbb833a38221430ec98bde8',
  steve: '5dbb835a38221430ec98bde9',
  bruce: '5dbb836638221430ec98bdea',
  mark: '5dbb837538221430ec98bdeb',
  andrew: '5dbb838338221430ec98bdec',
  kevin: '5dbb839238221430ec98bded'
};

const services = [
  { _id: ids.haircut, name: 'МУЖСКАЯ СТРИЖКА', price: '200' },
  { _id: ids.combo, name: 'СТРИЖКА + БОРОДА', price: '300' },
  { _id: ids.beard, name: 'КОРЕКЦИЯ БОРОДЫ', price: '100' },
  { _id: ids.shave, name: 'КОРОЛЕВСКОЕ БРИТЬЕ', price: '150' },
  { _id: ids.kids, name: 'ДЕТСКАЯ СТРИЖКА', price: '150' },
  { _id: ids.wax, name: 'УДАЛЕНИЕ ВОЛОС ГОРЯЧИМ ВОСКОМ', price: '50' },
  { _id: ids.gray, name: 'КАМУФЛЯЖ СЕДИНЫ', price: '200' }
];

const masters = [
  { _id: ids.ryan, name: 'Ryan Printz', position: 'Barber', imgsrc: 'assets/images/team/grid/1.jpg' },
  { _id: ids.steve, name: 'Steve Martin', position: 'Barber', imgsrc: 'assets/images/team/grid/2.jpg' },
  { _id: ids.bruce, name: 'Bruce Sam', position: 'Barber', imgsrc: 'assets/images/team/grid/3.jpg' },
  { _id: ids.mark, name: 'Mark Smith', position: 'Barber', imgsrc: 'assets/images/team/grid/4.jpg' },
  { _id: ids.andrew, name: 'Andrew John', position: 'Barber', imgsrc: 'assets/images/team/grid/5.jpg' },
  { _id: ids.kevin, name: 'AKevin Benny', position: 'Barber', imgsrc: 'assets/images/team/grid/6.jpg' }
];

let serverProcess;

function connectDatabase() {
  return new Promise(function (resolve, reject) {
    mongoose.connect(TEST_URI, { useMongoClient: true }, function (error) {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

function disconnectDatabase() {
  return new Promise(function (resolve) {
    mongoose.disconnect(resolve);
  });
}

function todayInYerevan() {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Yerevan',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).formatToParts(new Date()).reduce(function (result, part) {
    if (part.type !== 'literal') {
      result[part.type] = part.value;
    }
    return result;
  }, {});
  return parts.year + '-' + parts.month + '-' + parts.day;
}

function addDays(value, days) {
  const parts = value.split('-').map(Number);
  const date = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2] + days));
  return date.getUTCFullYear() + '-' +
    String(date.getUTCMonth() + 1).padStart(2, '0') + '-' +
    String(date.getUTCDate()).padStart(2, '0');
}

function nextWeekday(value, weekday) {
  for (let offset = 1; offset <= 7; offset += 1) {
    const candidate = addDays(value, offset);
    const parts = candidate.split('-').map(Number);
    if (new Date(Date.UTC(parts[0], parts[1] - 1, parts[2])).getUTCDay() === weekday) {
      return candidate;
    }
  }
  throw new Error('Could not find weekday');
}

async function request(route, options) {
  const response = await fetch(API + route, options);
  const text = await response.text();
  let body = null;
  try {
    body = text ? JSON.parse(text) : null;
  } catch (_) {
    body = { raw: text };
  }
  return { response: response, body: body };
}

async function postAppointment(payload, key) {
  return request('/api/booking/appointments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Idempotency-Key': key || crypto.randomUUID()
    },
    body: JSON.stringify(payload)
  });
}

function validPayload(overrides) {
  return Object.assign({
    serviceId: ids.haircut,
    masterId: ids.ryan,
    date: nextWeekday(todayInYerevan(), 6),
    startTime: '09:00',
    name: 'Тест Клиент',
    phone: '+374 99 000 100',
    comment: 'Автоматическая проверка'
  }, overrides || {});
}

async function waitForServer() {
  const deadline = Date.now() + 20000;
  while (Date.now() < deadline) {
    if (serverProcess.exitCode !== null) {
      throw new Error('Test API exited before becoming ready.');
    }
    try {
      const result = await request('/api/booking/options');
      if (result.response.status === 200) {
        return;
      }
    } catch (_) {
      // Keep waiting while the child connects and prepares indexes.
    }
    await new Promise(function (resolve) { setTimeout(resolve, 150); });
  }
  throw new Error('Timed out waiting for test API.');
}

before(async function () {
  await connectDatabase();
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.db.collection('services').insertMany(services.map(function (service) {
    return Object.assign({}, service, { _id: new mongoose.Types.ObjectId(service._id) });
  }));
  await mongoose.connection.db.collection('masters').insertMany(masters.map(function (master) {
    return Object.assign({}, master, { _id: new mongoose.Types.ObjectId(master._id) });
  }));

  serverProcess = spawn(process.execPath, ['server.js'], {
    cwd: path.resolve(__dirname, '..'),
    env: Object.assign({}, process.env, {
      PORT: String(TEST_PORT),
      MONGODB_URI: TEST_URI,
      BUSINESS_TIMEZONE: 'Asia/Yerevan',
      CORS_ORIGINS: 'http://localhost:8080',
      BOOKING_RATE_LIMIT: '500'
    }),
    stdio: ['ignore', 'pipe', 'pipe'],
    windowsHide: true
  });

  await waitForServer();
});

after(async function () {
  if (serverProcess && serverProcess.exitCode === null) {
    serverProcess.kill('SIGTERM');
    await new Promise(function (resolve) {
      serverProcess.once('exit', resolve);
      setTimeout(resolve, 3000);
    });
  }
  if (mongoose.connection.readyState === 1) {
    await mongoose.connection.db.dropDatabase();
  }
  await disconnectDatabase();
});

test('public booking API matrix', async function (t) {
  const today = todayInYerevan();
  const saturday = nextWeekday(today, 6);
  const sunday = nextWeekday(today, 0);

  await t.test('publishes all recovered options, durations, schedules, and eligibility', async function () {
    const result = await request('/api/booking/options');
    assert.equal(result.response.status, 200);
    assert.equal(result.body.data.timezone, 'Asia/Yerevan');
    assert.equal(result.body.data.services.length, 7);
    assert.equal(result.body.data.masters.length, 6);
    assert.deepEqual(result.body.data.services.map(function (item) { return item.durationMinutes; }), [60, 90, 30, 60, 60, 30, 60]);
    assert.equal(result.body.data.masters.filter(function (master) {
      return master.eligibleServiceIds.includes(ids.haircut);
    }).length, 6);
  });

  await t.test('books all six recovered barbers independently at the same clock time', async function () {
    const results = await Promise.all(masters.map(function (master, index) {
      return postAppointment(validPayload({
        masterId: String(master._id),
        date: saturday,
        startTime: '14:00',
        name: 'Мастер тест ' + (index + 1),
        phone: '+374 99 010 00' + index
      }));
    }));

    assert.deepEqual(results.map(function (result) {
      return result.response.status;
    }), [201, 201, 201, 201, 201, 201]);

    const saved = await mongoose.connection.db.collection('bookingappointments').find({
      date: saturday,
      startTime: '14:00'
    }).toArray();
    assert.equal(saved.length, 6);
    assert.equal(new Set(saved.map(function (appointment) {
      return String(appointment.master);
    })).size, 6);
  });

  await t.test('enforces dates, current-time filtering, days off, and duration-aware shifts', async function () {
    const past = await request('/api/booking/availability?serviceId=' + ids.haircut + '&masterId=' + ids.ryan + '&date=' + addDays(today, -1));
    assert.equal(past.response.status, 400);
    assert.equal(past.body.error.code, 'DATE_IN_PAST');

    const tooFar = await request('/api/booking/availability?serviceId=' + ids.haircut + '&masterId=' + ids.ryan + '&date=' + addDays(today, 31));
    assert.equal(tooFar.response.status, 400);
    assert.equal(tooFar.body.error.code, 'DATE_OUT_OF_RANGE');

    const currentDay = await request('/api/booking/availability?serviceId=' + ids.haircut + '&masterId=' + ids.steve + '&date=' + today);
    assert.equal(currentDay.response.status, 200);
    currentDay.body.data.slots.forEach(function (slot) {
      const localNow = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Yerevan', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).format(new Date());
      assert.ok(slot.start > localNow);
    });

    const dayOff = await request('/api/booking/availability?serviceId=' + ids.haircut + '&masterId=' + ids.ryan + '&date=' + sunday);
    assert.equal(dayOff.response.status, 200);
    assert.equal(dayOff.body.data.reason, 'MASTER_NOT_WORKING');
    assert.equal(dayOff.body.data.slots.length, 0);

    const combo = await request('/api/booking/availability?serviceId=' + ids.combo + '&masterId=' + ids.steve + '&date=' + sunday);
    assert.equal(combo.response.status, 200);
    assert.deepEqual(combo.body.data.slots[0], { start: '09:00', end: '10:30' });

    const twoWeeks = addDays(today, 14);
    const twoWeeksDay = new Date(twoWeeks + 'T00:00:00Z').getUTCDay();
    const masterByDayOff = [ids.ryan, ids.steve, ids.bruce, ids.mark, ids.andrew, ids.kevin];
    const workingMaster = masterByDayOff.find(function (_, index) { return index !== twoWeeksDay; });
    const future = await request('/api/booking/availability?serviceId=' + ids.haircut + '&masterId=' + workingMaster + '&date=' + twoWeeks);
    assert.equal(future.response.status, 200);
  });

  await t.test('rejects invalid IDs, service mismatch, time, client fields, injection, and oversized bodies', async function () {
    const invalidService = await postAppointment(validPayload({ serviceId: 'not-an-id' }));
    assert.equal(invalidService.response.status, 400);
    assert.equal(invalidService.body.error.code, 'INVALID_SERVICE');

    const invalidMaster = await postAppointment(validPayload({ masterId: 'not-an-id' }));
    assert.equal(invalidMaster.response.status, 400);
    assert.equal(invalidMaster.body.error.code, 'INVALID_MASTER');

    const mismatch = await postAppointment(validPayload({ serviceId: ids.shave, masterId: ids.steve }));
    assert.equal(mismatch.response.status, 400);
    assert.equal(mismatch.body.error.code, 'SERVICE_NOT_OFFERED');

    const invalidTime = await postAppointment(validPayload({ startTime: '09:15' }));
    assert.equal(invalidTime.response.status, 400);
    assert.equal(invalidTime.body.error.code, 'INVALID_TIME');

    const beforeShift = await postAppointment(validPayload({ startTime: '08:30' }));
    assert.equal(beforeShift.response.status, 409);
    assert.equal(beforeShift.body.error.code, 'SLOT_TAKEN');

    const afterShift = await postAppointment(validPayload({ startTime: '14:30' }));
    assert.equal(afterShift.response.status, 409);
    assert.equal(afterShift.body.error.code, 'SLOT_TAKEN');

    const badPhone = await postAppointment(validPayload({ phone: { $gt: '' } }));
    assert.equal(badPhone.response.status, 400);
    assert.equal(badPhone.body.error.code, 'VALIDATION_ERROR');

    const badName = await postAppointment(validPayload({ name: 'A' }));
    assert.equal(badName.response.status, 400);

    const badComment = await postAppointment(validPayload({ comment: 'x'.repeat(501) }));
    assert.equal(badComment.response.status, 400);

    const unknownField = await postAppointment(Object.assign(validPayload(), { $where: 'sleep(1000)' }));
    assert.equal(unknownField.response.status, 400);
    assert.equal(unknownField.body.error.code, 'VALIDATION_ERROR');

    const huge = await request('/api/booking/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Idempotency-Key': crypto.randomUUID() },
      body: JSON.stringify({ comment: 'x'.repeat(20000) })
    });
    assert.equal(huge.response.status, 413);
    assert.equal(huge.body.error.code, 'PAYLOAD_TOO_LARGE');
    assert.equal(JSON.stringify(huge.body).includes('stack'), false);
  });

  await t.test('creates a valid appointment, omits its occupied overlap, and handles idempotency', async function () {
    const key = crypto.randomUUID();
    const payload = validPayload();
    const created = await postAppointment(payload, key);
    assert.equal(created.response.status, 201);
    assert.equal(created.body.meta.replayed, false);
    assert.equal(created.body.data.appointment.clientName, payload.name);

    const replay = await postAppointment(payload, key);
    assert.equal(replay.response.status, 200);
    assert.equal(replay.body.meta.replayed, true);
    assert.equal(replay.body.data.appointment.id, created.body.data.appointment.id);

    const changedRequest = await postAppointment(Object.assign({}, payload, { comment: 'Другое значение' }), key);
    assert.equal(changedRequest.response.status, 409);
    assert.equal(changedRequest.body.error.code, 'IDEMPOTENCY_CONFLICT');

    const availability = await request('/api/booking/availability?serviceId=' + ids.beard + '&masterId=' + ids.ryan + '&date=' + saturday);
    assert.equal(availability.response.status, 200);
    assert.equal(availability.body.data.slots.some(function (slot) { return slot.start === '09:30'; }), false);

    const newKey = await postAppointment(validPayload({ startTime: '10:00', phone: '+374 99 000 101' }), crypto.randomUUID());
    assert.equal(newKey.response.status, 201);
    assert.notEqual(newKey.body.data.appointment.id, created.body.data.appointment.id);

    const doubleClickKey = crypto.randomUUID();
    const doubleClickPayload = validPayload({
      startTime: '13:00',
      name: 'Повторный клик',
      phone: '+374 99 000 104'
    });
    const doubleClick = await Promise.all([
      postAppointment(doubleClickPayload, doubleClickKey),
      postAppointment(doubleClickPayload, doubleClickKey)
    ]);
    assert.deepEqual(doubleClick.map(function (result) {
      return result.response.status;
    }).sort(), [200, 201]);
    assert.equal(doubleClick[0].body.data.appointment.id, doubleClick[1].body.data.appointment.id);

    const doubleClickCount = await mongoose.connection.db.collection('bookingappointments').count({
      clientName: doubleClickPayload.name
    });
    assert.equal(doubleClickCount, 1);

    const count = await mongoose.connection.db.collection('bookingappointments').count({ clientName: payload.name });
    assert.equal(count, 2);
  });

  await t.test('allows equal clock times for different masters and rejects same-master overlap', async function () {
    const differentMaster = await postAppointment(validPayload({
      masterId: ids.steve,
      startTime: '09:00',
      phone: '+374 99 000 102'
    }));
    assert.equal(differentMaster.response.status, 201);

    const overlap = await postAppointment(validPayload({
      serviceId: ids.beard,
      startTime: '09:30',
      phone: '+374 99 000 103'
    }));
    assert.equal(overlap.response.status, 409);
    assert.equal(overlap.body.error.code, 'SLOT_TAKEN');
  });

  await t.test('admits exactly one of two concurrent same-slot requests, repeatedly', async function () {
    async function raceAt(time, suffix) {
      const responses = await Promise.all([
        postAppointment(validPayload({ startTime: time, name: 'Гонка ' + suffix + ' A', phone: '+374 99 001 ' + suffix + '1' })),
        postAppointment(validPayload({ startTime: time, name: 'Гонка ' + suffix + ' B', phone: '+374 99 001 ' + suffix + '2' }))
      ]);
      assert.deepEqual(responses.map(function (result) { return result.response.status; }).sort(), [201, 409]);
      assert.equal(responses.find(function (result) { return result.response.status === 409; }).body.error.code, 'SLOT_TAKEN');
    }

    await raceAt('11:00', '11');
    await raceAt('12:00', '12');
  });

  await t.test('admits concurrent equal times for different masters', async function () {
    const responses = await Promise.all([
      postAppointment(validPayload({ masterId: ids.bruce, startTime: '13:00', phone: '+374 99 002 001' })),
      postAppointment(validPayload({ masterId: ids.mark, startTime: '13:00', phone: '+374 99 002 002' }))
    ]);
    assert.deepEqual(responses.map(function (result) { return result.response.status; }).sort(), [201, 201]);
  });

  await t.test('applies a narrow CORS allowlist without exposing internals', async function () {
    const allowed = await request('/api/booking/options', { headers: { Origin: 'http://localhost:8080' } });
    assert.equal(allowed.response.status, 200);
    assert.equal(allowed.response.headers.get('access-control-allow-origin'), 'http://localhost:8080');

    const denied = await request('/api/booking/options', { headers: { Origin: 'https://attacker.example' } });
    assert.equal(denied.response.status, 403);
    assert.equal(denied.body.error.code, 'CORS_ORIGIN_DENIED');
    assert.equal(JSON.stringify(denied.body).includes('stack'), false);
  });
});
