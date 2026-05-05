# Project & Task Management Web App

A full-stack web application for managing projects and tasks with role-based access control.

## Features

- User authentication (Signup/Login)
- Project creation and team management
- Task creation, assignment, and status tracking
- Dashboard with task overview and overdue alerts
- Role-based access (Admin/Member)

## Tech Stack

- Backend: Node.js, Express.js
- Database: PostgreSQL with Sequelize ORM
- Authentication: JWT
- Frontend: Vanilla JavaScript, Bootstrap

## Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up PostgreSQL database
4. Create `.env` file with DATABASE_URL, JWT_SECRET
5. Run the app: `npm start`

## Sample Login

- Admin: email `admin@example.com`, password `password`
- Member: email `member@example.com`, password `password`

## Deployment on Railway

1. Push code to GitHub
2. Connect Railway to the repo
3. Add PostgreSQL database in Railway dashboard
4. Set environment variables: DATABASE_URL, JWT_SECRET
5. Deploy

Railway will auto-detect Node.js and PostgreSQL.

## API Endpoints

- POST /api/auth/register - Register user
- POST /api/auth/login - Login user
- GET /api/projects - Get user's projects
- POST /api/projects - Create project
- GET /api/tasks/dashboard - Get user's tasks and overdue