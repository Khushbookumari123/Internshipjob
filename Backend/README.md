# Student Tracker — Backend

This is a minimal Express backend scaffold for the Student Tracker app. It provides mock endpoints for development and frontend integration.

Available endpoints:
- `GET /api/students` — list students
- `GET /api/students/:id` — single student
- `GET /api/attendance` — attendance data
- `GET /api/marks` — marks data
- `GET /api/reports` — reports
- `GET /api/profile` — profile data
- `POST /api/auth/login` — simple mock login

Quick start:

```bash
cd backend
npm install
npm run dev
```

Create `backend/.env` from `.env.example` and choose the database dialect.

To use SQLite (recommended for local development):

```env
PORT=5000
DB_DIALECT=sqlite
DB_NAME=internship_job
DB_STORAGE=./data/database.sqlite
DB_SYNC_ALTER=false
```

To use MySQL, set `DB_DIALECT=mysql` and provide the correct credentials:

```env
PORT=5000
DB_DIALECT=mysql
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=internship_job
DB_SYNC_ALTER=false
```

When the server starts, it loads models from `Models/`, runs `sequelize.sync()`, and creates the SQLite file or MySQL database as required.

```bash
npm run dev   # requires nodemon (dev dependency)
# or
npm start
```

CORS is enabled so the frontend (vite) can call the API at `http://localhost:5000`.

Replace mock logic and data with a real database and authentication for production.
