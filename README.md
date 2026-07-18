# 📋 Task Management System

A full-stack Task Management System built using **React + Vite**, **Spring Boot**, and **MySQL**. The application allows users to manage daily tasks through a clean and responsive web interface with complete CRUD functionality and task progress tracking.

---

## 🚀 Live Demo

### Frontend
https://task-management-system-1mda9w22o.vercel.app

### Backend API
https://taskmanagementsystem-r67t.onrender.com/api/tasks

---

## ✨ Features

- 📋 View all tasks
- ➕ Add new tasks
- ✏️ Update existing tasks
- ❌ Delete tasks
- ✅ Mark tasks as completed or pending
- 📊 Dashboard with task statistics
- 📈 Task completion progress tracking
- 🔄 Automatic refresh after CRUD operations
- 📱 Responsive user interface
- 🌙 Light/Dark mode support
- ☁️ Cloud-hosted frontend, backend, and database
- ⚡ RESTful API integration

---

## 🛠️ Tech Stack

### Frontend
- React
- Vite
- JavaScript
- Axios
- CSS3

### Backend
- Spring Boot
- Java 21
- Maven
- Spring Data JPA
- REST API

### Database
- MySQL
- Railway MySQL

### Deployment
- Frontend: Vercel
- Backend: Render
- Database: Railway

### Development Tools
- Visual Studio Code
- Postman
- MySQL Workbench
- Git
- GitHub

---

# 📁 Project Structure

```text
TaskManagementSystem
│
├── backend
│   ├── src
│   │   └── main
│   │       ├── java
│   │       │   └── com.taskmanager.backend
│   │       │       ├── controller
│   │       │       ├── entity
│   │       │       ├── repository
│   │       │       └── service
│   │       └── resources
│   │           └── application.properties
│   ├── pom.xml
│   └── Dockerfile
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── services
│   │   ├── App.jsx
│   │   └── App.css
│   ├── package.json
│   └── vite.config.js
│
├── screenshots
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/AaliyaPatel-11/TaskManagementSystem.git

cd TaskManagementSystem
```

---

# Backend Setup

Move into the backend folder:

```bash
cd backend
```

Create a MySQL database:

```sql
CREATE DATABASE taskmanager;
```

Configure the required database environment variables:

```text
SPRING_DATASOURCE_URL=jdbc:mysql://localhost:3306/taskmanager
SPRING_DATASOURCE_USERNAME=root
SPRING_DATASOURCE_PASSWORD=YOUR_PASSWORD
```

The application uses the following Spring Boot configuration:

```properties
spring.application.name=backend

spring.datasource.url=${SPRING_DATASOURCE_URL:jdbc:mysql://localhost:3306/taskmanager}
spring.datasource.username=${SPRING_DATASOURCE_USERNAME:root}
spring.datasource.password=${SPRING_DATASOURCE_PASSWORD:}

spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

spring.jpa.hibernate.ddl-auto=${SPRING_JPA_HIBERNATE_DDL_AUTO:update}
spring.jpa.show-sql=true

server.port=${PORT:8080}
```

Run the backend:

### Windows

```bash
.\mvnw.cmd spring-boot:run
```

### macOS/Linux

```bash
./mvnw spring-boot:run
```

The backend runs on:

```text
http://localhost:8080
```

The Tasks API is available at:

```text
http://localhost:8080/api/tasks
```

---

# Frontend Setup

Open another terminal and move into the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend runs on:

```text
http://localhost:5173
```

---

# 🌐 API Endpoints

| Method | Endpoint | Description |
|----------|----------------------|----------------------------|
| GET | `/api/tasks` | Get all tasks |
| GET | `/api/tasks/{id}` | Get task by ID |
| POST | `/api/tasks` | Create a new task |
| PUT | `/api/tasks/{id}` | Update an existing task |
| DELETE | `/api/tasks/{id}` | Delete a task |

---

# 🗄️ Database Structure

The application uses a MySQL database to store task information.

### Database

```text
taskmanager
```

### Task Entity

| Field | Type | Description |
|-------|------|-------------|
| `id` | Long | Unique task identifier |
| `title` | String | Task title |
| `description` | String | Task description |
| `status` | String | Task status (Pending/Completed) |

Spring Data JPA and Hibernate are used to automatically manage the database schema.

---

# 🚀 Deployment

## Frontend

Hosted on Vercel:

```text
https://task-management-system-1mda9w22o.vercel.app
```

## Backend

Hosted on Render using Docker:

```text
https://taskmanagementsystem-r67t.onrender.com
```

REST API:

```text
https://taskmanagementsystem-r67t.onrender.com/api/tasks
```

## Database

Hosted using MySQL on Railway.

The deployed architecture is:

```text
React + Vite (Vercel)
        │
        │ REST API
        ▼
Spring Boot (Render)
        │
        │ JDBC
        ▼
MySQL (Railway)
```

---

# 🔧 Environment Variables

## Backend

The following environment variables are configured for the deployed Spring Boot application:

```text
SPRING_DATASOURCE_URL
SPRING_DATASOURCE_USERNAME
SPRING_DATASOURCE_PASSWORD
SPRING_JPA_HIBERNATE_DDL_AUTO
```

Database credentials are stored securely as environment variables and are not committed to the repository.

---

# 🐳 Docker

The Spring Boot backend is containerized using Docker for deployment on Render.

The Docker build process:

1. Uses Java 21 JDK to build the Spring Boot application.
2. Builds the project using Maven Wrapper.
3. Creates the executable Spring Boot JAR.
4. Runs the application using Java 21 JRE.

---

# 📸 Screenshots

## Dashboard

![TaskFlow Dashboard](screenshots/image.png)

## Add Task

![Add Task](screenshots/image-1.png)

## Edit Task

![Edit Task](screenshots/image-2.png)

## Delete Task

![Delete Task](screenshots/image-3.png)

---

# 📈 Future Improvements

- 🔍 Task search
- 🔽 Task filtering
- 📅 Due dates
- 🚩 Priority levels
- 🔐 User authentication and authorization
- 🗂️ Task categories
- 📄 Pagination
- 📧 Email reminders
- 👥 Multi-user task management
- 🧪 Unit and integration testing
- 🐳 Docker Compose
- 🔄 CI/CD pipeline

---

# 👩‍💻 Author

**Aaliya Mubashira**

B.Tech - Artificial Intelligence & Machine Learning  
Malla Reddy University

GitHub: https://github.com/AaliyaPatel-11

LinkedIn: https://linkedin.com/in/patel-aaliya-mubashira-904293223/

---

# 📄 License

This project is developed for educational and learning purposes.