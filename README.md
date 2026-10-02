# Barbershop

An educational full-stack web application for a barbershop website, with a Vue 2 frontend and an Express/MongoDB backend.

## About

This project was created during an earlier stage of my software-development studies. It is preserved as part of my development journey and has received a conservative repository cleanup so it remains understandable and safe to review.

The application is a learning project, not a production-ready booking system. Its original Vue 2 and Express architecture and visual design have intentionally been retained.

## Features

- Barbershop landing, about, staff, and gallery pages
- Services, staff, gallery, and capability content loaded from a REST API
- Appointment availability lookup and booking updates
- Environment-configured email notifications for bookings
- Environment-configured admin sign-in and an admin booking list
- CRUD-style Express routes backed by MongoDB and Mongoose

## Tech Stack

### Frontend

- Vue.js 2
- Vue Router
- Vuex
- Axios
- Webpack 4
- JavaScript, HTML, CSS, and legacy jQuery-based theme assets

### Backend

- Node.js
- Express
- MongoDB with Mongoose
- Nodemailer

## Project Structure

```text
barbershop/
├── frontend/       # Vue 2 client application and static assets
├── backend/        # Express API, Mongoose models, and mail integration
├── .env.example    # Safe local configuration template
├── .gitignore
└── README.md
```

Local dependencies, build output, logs, environment files, and MongoDB database files are intentionally excluded from Git.

## Running Locally

### Prerequisites

- Node.js and npm (an older LTS release is the most compatible choice for this legacy Webpack 4 project)
- A local or remote MongoDB instance compatible with the legacy Mongoose 4 dependency

The repository does not include a local MongoDB database or seed data.

### 1. Configure the environment

Copy `.env.example` to `.env` at the repository root and replace the placeholders needed for your local setup. Never commit `.env`.

`MONGODB_URI`, `ADMIN_USER`, and `ADMIN_PASS` are needed for the database-backed application and admin screen. Mail delivery is optional; when `MAIL_USER` or `MAIL_PASS` is absent, bookings continue without an email notification.

### 2. Install and start the backend

```bash
cd backend
npm install
npm start
```

The API listens on `http://localhost:3000` by default.

### 3. Install and start the frontend

In another terminal:

```bash
cd frontend
npm install
npm start
```

The frontend development server listens on `http://localhost:8080` by default. Its API URL defaults to `http://localhost:3000`; a deployment may set `window.BARBERSHOP_API_URL` before the generated bundle loads.

### Production bundle

```bash
cd frontend
npm run build
```

Webpack writes the generated bundle to `frontend/dist/`, which is not tracked.

## Environment Variables

| Variable | Purpose |
| --- | --- |
| `PORT` | Express server port; defaults to `3000` |
| `MONGODB_URI` | MongoDB connection URI |
| `MAIL_USER` | SMTP account username |
| `MAIL_PASS` | SMTP account password or app password |
| `MAIL_FROM` | Optional sender address; defaults to `MAIL_USER` |
| `MAIL_TO` | Optional notification recipient; defaults to `MAIL_USER` |
| `ADMIN_USER` | Local admin username |
| `ADMIN_PASS` | Local admin password |

The lightweight admin token store is in memory and resets whenever the backend restarts. It is suitable only for this local educational application.

## Historical Project Note

This repository intentionally remains recognizably an older educational project. Dependencies have not been broadly upgraded because major framework migrations would change the character and risk breaking the application. A production system would need current dependencies, persistent authentication, input validation, tests, and a deployment-specific security review.

## Author

Sargis Hovsepyan
