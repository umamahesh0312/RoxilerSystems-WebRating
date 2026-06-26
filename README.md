# RoxSys - Store Rating Platform

A full-stack Store Rating application with a React + TypeScript frontend and an Express + TypeScript backend.

## Contents

- `/backend` - backend API server with Prisma, MySQL, authentication, and role-based access control
- `/src` - frontend React app built with Vite, MUI, React Router, and Zod validation

## Prerequisites

- Node.js 20+ installed
- npm installed
- MySQL server running locally or accessible through a database URL

## Repository Setup

This repository contains two separate projects:

1. Frontend: workspace root
2. Backend: `/backend`

Each project has its own dependencies and startup commands.

---

## Backend Setup

### 1. Install backend dependencies

```bash
cd backend
npm install
```

### 2. Configure backend environment variables

Create a file at `backend/.env` with at least the following variables:

```env
DATABASE_URL=mysql://USER:PASSWORD@HOST:PORT/DATABASE_NAME
PORT=3001
JWT_SECRET=your_jwt_secret_key_change_this_in_production
JWT_EXPIRATION=7d
CORS_ORIGIN=http://localhost:5173
```

### 3. Generate Prisma client

```bash
npm run prisma:generate
```

### 4. Run database migrations

```bash
npm run prisma:migrate
```

### 5. Seed the database

```bash
npm run prisma:seed
```

The seed script creates sample users, store owners, stores, and ratings.

### 6. Start the backend server

```bash
npm run dev
```

The backend server listens on `http://localhost:3001` by default.

---

## Frontend Setup

### 1. Install frontend dependencies

From the repository root:

```bash
npm install
```

### 2. Configure frontend environment variables

Create a `.env` file in the repository root with:

```env
VITE_API_BASE_URL=http://localhost:3001/api
```

### 3. Start the frontend

```bash
npm run dev
```

The frontend runs on `http://localhost:5173` by default.

---

## Usage

### Default test accounts

Use these accounts after seeding the backend:

- Admin: `admin@roxsys.com` / `Admin@123`
- Store Owner: `owner1@roxsys.com` / `Owner1@123`
- Regular User: `user1@roxsys.com` / `User1@123`

### Common actions

- Admin: manage users, manage stores, view dashboard metrics
- Store Owner: view own stores and store ratings
- User: browse stores, submit ratings, manage profile

---

## Scripts

### Frontend scripts (root)

- `npm run dev` - start Vite development server
- `npm run build` - build frontend for production
- `npm run preview` - preview production build
- `npm run type-check` - run TypeScript type checking

### Backend scripts (`/backend`)

- `npm run dev` - start backend in development with ts-node
- `npm run build` - compile backend TypeScript to `dist`
- `npm run start` - run compiled backend
- `npm run prisma:generate` - generate Prisma client
- `npm run prisma:migrate` - run Prisma migrations
- `npm run prisma:migrate:prod` - deploy migrations in production
- `npm run prisma:seed` - seed the database
- `npm run prisma:studio` - open Prisma Studio
- `npm run format` - format backend source with Prettier
- `npm run lint` - lint backend TypeScript files

---

## Environment variables

### Backend

- `DATABASE_URL` - MySQL connection string
- `PORT` - backend server port (default `3001`)
- `JWT_SECRET` - secret key for token signing
- `JWT_EXPIRATION` - JWT expiry (default `7d`)
- `CORS_ORIGIN` - allowed frontend origin

### Frontend

- `VITE_API_BASE_URL` - backend URL prefix for API requests

---

## Notes

- Start the backend before launching the frontend.
- If port `3001` is already in use, change `PORT` in `backend/.env` and update `VITE_API_BASE_URL` accordingly.
- The backend uses Prisma with MySQL; make sure your database exists and is reachable.
- The frontend is configured for role-based routes, so login is required to access admin/owner/user sections.

## Helpful commands

From repo root:

```bash
npm install
npm run dev
```

From backend folder:

```bash
cd backend
npm install
npm run dev
```

From root to build frontend:

```bash
npm run build
```

---

## Troubleshooting

- `npm run prisma:migrate` fails: verify `DATABASE_URL` and that MySQL is running.
- `JWT_SECRET` warning: replace the default secret before production.
- Backend not reachable from frontend: verify `VITE_API_BASE_URL` and `CORS_ORIGIN`.

---

## Contact

For support, use the repository issue tracker or contact the development team.
