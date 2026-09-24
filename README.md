<div align="center">

<img src="Gradex/public/logo.png" alt="Gradex" width="80" />

# Gradex

**A full-stack GPA tracker that lets you organize courses by semester, track grades in real time, and visualize your academic progress.**

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Express](https://img.shields.io/badge/Express-4-000000?logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-4169E1?logo=postgresql&logoColor=white)
![JWT](https://img.shields.io/badge/Auth-JWT-000000?logo=jsonwebtokens&logoColor=white)
![bcrypt](https://img.shields.io/badge/Passwords-bcrypt-0AA0A0?logo=lock&logoColor=white)

</div>

---

## About

Gradex is a self-hosted academic performance tracker that keeps your GPA current in real time. Add semesters with custom labels, put courses under them with credit hours and letter grades, and let Gradex handle every calculation. Cumulative and semester GPA update instantly as you add grades, and mark courses as in progress, completed, dropped, or failed so nothing is misrepresented in your numbers.

Every user owns their data. Records are scoped per account in PostgreSQL, protected by JWT-based auth with bcrypt-hashed passwords and ownership checks on every protected endpoint. A clean, dark dashboard with charts, gauges, and progress widgets turns raw marks into a clear picture of where you stand and what it takes to improve.

## What I Built

This project demonstrates the full development lifecycle of a production-grade web application, from database design to a polished, deployment-ready UI. It covers:

- **GPA Calculation Engine:** Building credit-weighted grade point math that recomputes semester and cumulative GPA the moment courses or grades change, with support for configurable GPA scales (4.0, 5.0, 10.0)
- **Course & Semester Management:** Implementing full CRUD flows for semesters and courses, including course status transitions between taking, completed, dropped, and failed
- **Visual Analytics Dashboard:** Designing a live dashboard with a GPA bar chart across semesters, a gauge with degree completion progress, and a dedicated dropped/failed courses widget
- **Configurable Academic Settings:** Building a settings system that controls GPA scale, semesters per year, graduation credits, and default credits per course, plus a first-run profile setup flow
- **Authentication & Authorization:** Building JWT-based auth with bcrypt hashing, per-user data scoping, ownership verification middleware on every protected route, and a clear-data flow scoped to the current account
- **Full-Stack State Management:** Managing complex frontend state across semesters, courses, popups, toasts, and settings in a single-page application with a dedicated Express API

## Key Features

- **Real-Time GPA Calculations** - Semester and cumulative GPA recompute instantly whenever courses, grades, or credits change
- **Semester Management** - Create and delete labeled semesters, each with its own stored GPA
- **Course Management** - Add courses with credit hours and letter grades, update status, and delete them from any semester
- **Course Status Tracking** - Mark courses as taking, completed, dropped, or failed; dropped and failed courses are surfaced in a dedicated widget so they never slip through
- **Visual Analytics** - A bar chart of GPA across semesters, a gauge showing current GPA against the degree progress, and a dropped/failed panel
- **Configurable Grading** - Set your own GPA scale, semesters per year, graduation credits, and default course credits
- **Profile Setup** - First-run wizard to set your university and major, stored with your account
- **Data Control** - Clear all of your academic data in one click, scoped to your account only
- **Secure Authentication** - Sign up and sign in with JWT and bcrypt, with ownership checks on every protected endpoint
- **Dark Mode UI** - Clean, minimal, responsive interface designed for focus

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Tailwind CSS 4, Vite |
| Backend | Node.js, Express 4 |
| Database | PostgreSQL (pg) |
| Auth | JWT + bcrypt |
| Charts | Custom SVG components (bar chart, gauge) with Lucide React icons |
| Tooling | ESLint, concurrently, nodemon |

## How the GPA Engine Works

1. **Organize** - Create a semester with a custom label that matches your academic year (for example, Year 2 - Semester 1)
2. **Grade** - Add courses to that semester with credit hours and a letter grade. Assign a status: taking, completed, dropped, or failed
3. **Calculate** - Every letter grade maps to grade points (A = 4.0, A- = 3.7, and so on). Semester GPA is the credit-weighted average of graded courses, and cumulative GPA is the credit-weighted average across every semester. Results are scaled to your configured maximum scale
4. **Visualize** - The dashboard renders the trend as a bar chart, shows your current GPA against degree completion on a gauge, and lists dropped and failed courses separately
5. **Control** - Adjust the GPA scale, graduation credits, and defaults in settings, or clear all data and start fresh, all scoped to your account

## Project Structure

```
Gradex/
├── server/              # Express backend
│   ├── config/db.js     # PostgreSQL connection pool
│   ├── controllers/     # auth, courses, semesters, settings controllers
│   ├── middleware/      # verifyToken (JWT), semester and course ownership checks
│   ├── routes/          # /auth, /courses, /semesters, /settings
│   └── index.js         # Server entry point
├── src/
│   ├── components/      # Popups, sidebar, charts, gauge, stat cards
│   ├── context/         # Toast notification context
│   ├── pages/           # LandingPage, Dashboard, Settings
│   ├── services/        # API clients (auth, course, semester, settings)
│   └── App.jsx          # Root application and routing
├── index.html
├── package.json         # Frontend and orchestration scripts
└── vite.config.js
```

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/Saif-jaber/Gradex.git
cd Gradex
npm install
cd server && npm install
cd ..
```

> **Note:** The repo has two `package.json` files, one for the frontend and one for the backend. Both must be installed.

### 2. Configure environment

Create a `.env` file inside the `Gradex/` folder:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=gradex

PORT=5000

JWT_SECRET=your_long_random_secret
```

Optionally set the frontend API base URL (defaults to `http://localhost:5000`):

```env
VITE_API_URL=http://localhost:5000
```

### 3. Set up the database

1. Install [PostgreSQL](https://www.postgresql.org/download/) and start the service
2. Create an empty database named `gradex` (the schema is defined by the application)
3. Point the `.env` variables above at your database credentials

### 4. Run

```bash
# terminal 1 - backend (port 5000) and frontend (port 5173) together
npm start

# or run them separately
npm run server:dev   # backend with auto-reload
npm run dev          # frontend
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Build the frontend for production |
| `npm run preview` | Preview the production build |
| `npm run server` | Start the Express server |
| `npm run server:dev` | Start the server with nodemon |
| `npm start` | Run the API server and dev frontend together |
| `npm run lint` | Lint the codebase with ESLint |

## API Overview

All routes under `/courses`, `/semesters`, and `/settings` require a Bearer token issued at login or signup.

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/auth/signup` | No | Create an account, receive JWT |
| POST | `/auth/login` | No | Log in, receive JWT |
| GET | `/auth/getUserID` | No | Get a user ID by email |
| GET | `/courses` | Yes | List courses |
| POST | `/courses/add` | Yes | Add a course to a semester |
| POST | `/courses/updateStatus/:id` | Yes | Update a course's status and grade |
| DELETE | `/courses/:id` | Yes | Delete a course (ownership required) |
| GET | `/semesters/semList` | Yes | List all semesters with their courses |
| POST | `/semesters/add` | Yes | Create a semester |
| GET | `/semesters/check/:semester_id` | Yes | Check if a semester exists |
| GET | `/semesters/id/:name` | Yes | Get a semester by name |
| DELETE | `/semesters/clear-all` | Yes | Delete all of the user's semesters |
| DELETE | `/semesters/:id` | Yes | Delete a semester (ownership required) |
| GET | `/settings` | Yes | Get the user's academic settings |
| PUT | `/settings` | Yes | Update academic settings |

## Roadmap

- [x] Backend API with authentication
- [x] PostgreSQL integration with per-user data scoping
- [x] Semester and course CRUD
- [x] Course status tracking (taking, completed, dropped, failed)
- [x] Real-time GPA calculations
- [x] Visual analytics dashboard (bar chart, gauge, dropped/failed widget)
- [x] Configurable academic settings and first-run profile setup
- [x] Clear-data flow scoped to the current account
- [ ] Import and export of academic data as JSON
- [ ] Target GPA planner per semester

## Contact

**Saif Jaber** | [GitHub](https://github.com/Saif-jaber)

---

<div align="center">

Built for students who take their GPA seriously.

</div>