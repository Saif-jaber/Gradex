# Gradex — GPA Tracker

Gradex is a full-stack academic performance tracker that helps students monitor their GPA in real time. Organize courses by semester, track grades and credit hours, visualize your progress with interactive charts, and manage profile settings — all from one clean, dark-themed dashboard.

## Features

- **Real-time GPA calculations** — cumulative and per-semester GPA update instantly as you add courses or change grades.
- **Semester & course management** — add, delete, and update semesters and courses, including credit hours and grades.
- **Course status tracking** — mark courses as *taking*, *completed*, *dropped*, or *failed* from a dedicated panel.
- **Visual analytics** — GPA bar chart, a progress gauge with degree completion, and a dropped/failed course widget.
- **Customizable academic settings** — GPA scale (4.0 / 5.0 / 10.0), semesters per year, graduation credits, and default credits per course.
- **Profile setup** — set your university and major on first run.
- **Secure authentication** — JWT-based auth with bcrypt-hashed passwords, token middleware, and per-user data ownership checks.
- **Data control** — clear all of your data in one click; every user's records are fully isolated.
- **Responsive UI** — built mobile-first with a modern dark theme.

## Tech Stack

| Layer     | Technologies |
|-----------|--------------|
| Frontend  | React 19, Vite, Tailwind CSS, React Router, Lucide React |
| Backend   | Node.js, Express, PostgreSQL (`pg`), JWT, bcrypt |
| Tooling   | ESLint, concurrently, nodemon |

## Project Structure

```
Gradex/
├── server/              # Express backend
│   ├── config/db.js     # PostgreSQL connection pool
│   ├── controllers/     # auth, courses, semesters, settings logic
│   ├── middleware/      # JWT verification + ownership checks
│   ├── routes/          # API route definitions
│   └── index.js         # Server entry point
├── src/
│   ├── components/      # Popups, charts, sidebar, stat cards
│   ├── context/         # Toast notification context
│   ├── pages/           # LandingPage, Dashboard, Settings
│   ├── services/        # API client functions (auth, courses, semesters, settings)
│   └── App.jsx          # Root application and routing
├── index.html
├── package.json         # Frontend + orchestration scripts
└── vite.config.js
```

## Getting Started

### Prerequisites

- **Node.js** 18+
- **PostgreSQL** 14+
- **npm**

### 1. Install dependencies

The project has two `package.json` files — one for the frontend and one for the backend.

```bash
cd Gradex
npm install
cd server && npm install
cd ..
```

### 2. Configure environment variables

Create a `.env` file inside the `Gradex/` folder with your database and server settings:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=gradex

PORT=5000

JWT_SECRET=your_long_random_secret
```

Optionally set the frontend API base URL (it defaults to `http://localhost:5000`):

```env
VITE_API_URL=http://localhost:5000
```

### 3. Set up the database

Create a database named `gradex` in PostgreSQL, then restore the schema:

```bash
psql -U postgres -d gradex -f Backup/schema_backup.sql
```

This creates the `users`, `semesters`, `courses`, and `settings` tables.

### 4. Run the app

```bash
npm start
```

This launches both the Express API server and the Vite dev server via `concurrently`. Alternatively, run them separately:

```bash
npm run server:dev   # backend with auto-reload
npm run dev          # frontend
```

The frontend runs at `http://localhost:5173` and the API at `http://localhost:5000`.

## Scripts

| Command            | Description                              |
|--------------------|------------------------------------------|
| `npm run dev`      | Start the Vite dev server                |
| `npm run build`    | Build the frontend for production        |
| `npm run preview`  | Preview the production build             |
| `npm run server`   | Start the Express server                 |
| `npm run server:dev` | Start the server with nodemon         |
| `npm start`        | Run the API server and dev frontend together |
| `npm run lint`     | Lint the codebase with ESLint            |

## API Overview

All routes below `/courses`, `/semesters`, and `/settings` require a Bearer token issued at login/signup.

| Method   | Endpoint                       | Description                          |
|----------|--------------------------------|--------------------------------------|
| POST     | `/auth/signup`                 | Register a new user                  |
| POST     | `/auth/login`                  | Log in and receive a JWT             |
| GET      | `/auth/getUserID`              | Get a user ID by email               |
| POST     | `/courses/add`                 | Add a course to a semester           |
| POST     | `/courses/updateStatus/:id`    | Update a course's status and grade   |
| DELETE   | `/courses/:id`                 | Delete a course (ownership required) |
| POST     | `/semesters/add`               | Create a semester                    |
| GET      | `/semesters/semList`           | List all semesters with their courses|
| GET      | `/semesters/check/:semester_id`| Check if a semester exists            |
| GET      | `/semesters/id/:name`          | Get a semester by name                |
| DELETE   | `/semesters/clear-all`         | Delete all of the user's semesters    |
| DELETE   | `/semesters/:id`               | Delete a semester (ownership required)|
| GET      | `/settings`                    | Get the user's academic settings      |
| PUT      | `/settings`                    | Update academic settings              |

## Database Schema

- **users** — `id`, `name`, `email`, `password_hash`, `university`, `major`
- **semesters** — `id`, `user_id`, `name`, `academic_year`, `start_date`, `end_date`, `gpa`
- **courses** — `id`, `semester_id`, `name`, `code`, `credits`, `grade`, `status` (`taking`, `dropped`, `failed`, `completed`)
- **settings** — `id`, `user_id`, `max_gpa`, `semesters_per_year`, `graduation_credits`, `default_credits`

All child records cascade-delete with their parent, and every query is scoped to the authenticated user.