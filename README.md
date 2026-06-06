# Taskify

Taskify is a task management web application that helps users organize and track their daily tasks efficiently. Users can create tasks, update their status, monitor progress, and collaborate with team members.

## Features

- User Authentication (Login & Registration)
- Create, Update, and Delete Tasks
- Task Status Management
- Progress Tracking
- Team Creation and Management
- Assign Tasks to Team Members
- Dashboard Overview
- Secure API Authentication using JWT
- Responsive User Interface

## Technologies Used

### Frontend
- React.js
- Tailwind CSS
- Axios
- React Router

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Cookie Parser

## Project Structure

```
Taskify/
│
├── frontend/
│   ├── src/
│   ├── public/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── config/
│
└── README.md
```

## Installation

### Clone Repository

```bash
git clone <repository-url>
```

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

Create a `.env` file in the backend directory and add:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
NODE_ENV=development
```

## API Endpoints

### Authentication

- POST `/api/auth/register`
- POST `/api/auth/login`
- POST `/api/auth/logout`

### Tasks

- GET `/api/tasks`
- POST `/api/tasks`
- PUT `/api/tasks/:id`
- DELETE `/api/tasks/:id`

### Teams

- GET `/api/teams`
- POST `/api/teams`
- PUT `/api/teams/:id`
- DELETE `/api/teams/:id`

## Future Improvements

- Task Deadlines & Reminders
- Email Notifications
- Activity Logs
- File Attachments
- Dark Mode

## License

This project is developed for learning and portfolio purposes.
