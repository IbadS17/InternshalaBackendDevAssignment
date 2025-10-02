# TaskMaster

A lightweight full-stack task manager built for a Frontend Developer Intern assignment. Clean UX, authentication, email verification, and task productivity.

## What it does

Register → Get verification email → Verify → Login → Create / Update / Filter tasks → Logout.

## Tech Stack

- Frontend: React + Vite, TailwindCSS, React Router, React Hook Form
- Backend: Node.js, Express, MongoDB (Mongoose)
- Auth & Security: JWT, bcrypt, protected routes, email verification
- Email: Nodemailer + HTML templates

## Core Features

✅ Register / Login / Logout
✅ Email verification (24h token + resend)
✅ Dark / Light theme (persists)
✅ CRUD: title, description, priority, status, due date
✅ Search + filter tasks
✅ Form validation (client + server)
✅ Toast notifications & loading states

## Quick Start

Backend:

```bash
cd backend
npm install
npm start
```

Frontend:

```bash
cd frontend
npm install
npm run dev
```

### Backend .env

```
PORT=5000
MONGODB_URI=your_mongodb_connection
JWT_SECRET=replace_with_strong_secret
JWT_EXPIRE=7d
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
FRONTEND_URL=http://localhost:3000
BACKEND_URL=http://localhost:5000
```

## Structure (Minimal)

```
backend/
	src/controllers  src/models  src/routes  src/middleware  src/utils
frontend/
	src/components  src/pages  src/context  src/utils
```

## Checklist

- [x] Responsive UI
- [x] Auth + JWT + protected routes
- [x] Email verification
- [x] CRUD entity (tasks)
- [x] Search & filter
- [x] Password hashing (bcrypt)
- [x] Validation & error handling
- [x] Clean scalable structure

## Why it’s solid

Fast setup, clear separation of concerns, defensive backend, smooth UX (modals, toasts, loading states), production-ready patterns (env config, verification flow).

## Next Ideas

Pagination • Role-based views • Optimistic updates • Task history

---

Built in ~3 days. Feel free to fork or reach out.

```

```
