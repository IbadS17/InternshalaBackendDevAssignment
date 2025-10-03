# Frontend Developer Assignment

## Project Overview

This is a full-stack web application built as part of my internship assignments. It includes a **React frontend** with authentication and dashboard, and a **Node.js/Express backend** with JWT-based authentication and CRUD APIs. The app is responsive, secure, and structured for easy scaling.

---

## Features

### Frontend

- Signup / Login / Logout with JWT
- Protected routes for dashboard access
- Forms with client & server-side validation
- CRUD operations on sample entity (tasks/notes/posts)
- Search and filter UI
- Responsive design using TailwindCSS

### Backend

- User registration & login with hashed passwords (bcrypt)
- JWT-based authentication & role-based access (user/admin)
- CRUD APIs for sample entity
- Input validation and error handling
- API versioning (`/api/v1/...`)
- Postman collection included for testing

---

## Project Structure

```
project-root/
 ├── backend/       # Node/Express + MongoDB backend
 ├── frontend/      # React + Tailwind frontend
 ├── postman/       # Postman collection
 └── README.md
```

---

## Setup Instructions

### Backend

```bash
cd backend
npm install
npm run dev
```

Runs at: `http://localhost:5000`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs at: `http://localhost:5173`

---

## Test Credentials

```
Admin:
Email: admin@example.com
Password: 123456

User:
Email: user@example.com
Password: 123456
```

---

## API Documentation

Postman Collection: [`postman_collection.json`](./postman/postman_collection.json)

---

## Scalability Notes

Right now app is simple monolithic, but if traffic grow in future then we can split into micro services (auth, tasks, etc). Also can add Redis cache for speed, use load balancer with multiple servers, and DB replication/sharding for handling more users. Later we can dockerize for easy deploy.

---

