# Hairy Barbershop

A recovered full-stack barbershop site with a Vue 2 public frontend, an Express API, and MongoDB/Mongoose persistence. Its original dark, charcoal, and gold Hairy design is intentionally retained.

## Public Features

- Home, About Us, Our Staff, and Gallery pages
- Three-slide hero and three-quote testimonial carousels
- Seven recovered services, six recovered barbers, and nine recovered gallery images
- Account-free public appointment booking
- Backend-authoritative schedules and availability
- Duration-aware conflict detection, atomic overlap protection, and request idempotency
- Russian booking, confirmation, validation, and failure states

The public booking flow does not require login, registration, or a client profile. Legacy administration code remains outside the scope of the public booking feature.

## Local Development

The root launcher starts the recovered MongoDB compatibility instance, waits for it, then starts the backend and frontend:

```bash
npm start
```

Use the companion commands to inspect or stop only this project-managed stack:

```bash
npm run status
npm run stop
```

The default local addresses are:

- Frontend: `http://localhost:8080`
- Backend: `http://localhost:3000`
- Recovered MongoDB compatibility instance: `127.0.0.1:27018`

Local dependencies, build output, runtime state, logs, environment files, and database files are excluded from Git.

## Booking Design

Booking uses the recovered master and service records without duplicating them. A small deterministic booking metadata layer supplies service durations, weekly schedules, days off, and service eligibility.

| Service | Duration |
| --- | ---: |
| МУЖСКАЯ СТРИЖКА | 60 minutes |
| СТРИЖКА + БОРОДА | 90 minutes |
| КОРЕКЦИЯ БОРОДЫ | 30 minutes |
| КОРОЛЕВСКОЕ БРИТЬЕ | 60 minutes |
| ДЕТСКАЯ СТРИЖКА | 60 minutes |
| УДАЛЕНИЕ ВОЛОС ГОРЯЧИМ ВОСКОМ | 30 minutes |
| КАМУФЛЯЖ СЕДИНЫ | 60 minutes |

- Slot interval: 30 minutes
- Booking horizon: today through 30 days ahead
- Business timezone: configurable IANA name, default `Asia/Yerevan`
- Base hours: Monday–Friday 09:00–17:00, Saturday 09:00–15:00, Sunday 09:00–13:00
- Each barber has one deterministic day off and an explicit eligible-service list

The API revalidates the selected service, barber, date, shift, eligibility, duration, and time during creation. Every occupied minute is represented by a lock key in the appointment document. A unique multikey index on barber plus lock key makes overlapping inserts for the same barber mutually exclusive on standalone MongoDB, without relying on transactions. A separately unique SHA-256 hash of the client UUID idempotency key prevents repeat submissions.

## Booking API

- `GET /api/booking/options` returns timezone, horizon, services, durations, barbers, eligibility, and weekly schedules.
- `GET /api/booking/availability?serviceId=<id>&masterId=<id>&date=YYYY-MM-DD` returns the server-authoritative slots for one selection.
- `POST /api/booking/appointments` creates a confirmed appointment. It requires JSON booking fields and a UUID v4 `Idempotency-Key` header.

The booking routes use a configurable local CORS allowlist, a 16 KiB request-body limit, basic per-IP rate limiting, bounded client fields, normalized phone storage, and sanitized error responses.

## Development Checks

Run the booking API and concurrency suite while the root MongoDB stack is available:

```bash
cd backend
npm test
```

Build the public frontend production bundle:

```bash
cd frontend
npm run build
```

## Environment Variables

| Variable | Purpose |
| --- | --- |
| `PORT` | Express server port; defaults to `3000` |
| `MONGODB_URI` | MongoDB connection URI |
| `BUSINESS_TIMEZONE` | IANA business timezone; defaults to `Asia/Yerevan` |
| `CORS_ORIGINS` | Comma-separated allowed frontend origins |
| `BOOKING_RATE_LIMIT` | Requests allowed per IP in a five-minute booking window |
| `MAIL_USER`, `MAIL_PASS`, `MAIL_FROM`, `MAIL_TO` | Optional legacy mail settings |
| `ADMIN_USER`, `ADMIN_PASS` | Optional legacy administration credentials |

Never commit `.env` or real credentials.

## Technology

- Vue 2, Vue Router, Vuex, Axios, and the retained jQuery-based theme assets
- Webpack 5 development and production tooling
- Node.js, Express, Mongoose 4, and the recovered standalone MongoDB 4.0 compatibility runtime

## Author

Sargis Hovsepyan
