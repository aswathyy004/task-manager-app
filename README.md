# Task Manager App

A simple full-stack Task Manager application that allows users to manage tasks across different stages: **Todo, In Progress, and Done**. Built as part of an internship assignment.

---

## 🚀 Live Links

**Frontend:**
https://task-manager-frontend-kdkxvlyxg-aswathyy004s-projects.vercel.app

**Backend:**
https://task-manager-backend-91xu.onrender.com

---

## ✨ Features

### 🔐 Authentication

* User registration and login
* JWT-based authentication
* Protected routes

### 📝 Task Management

* Create new tasks
* Update task status
* Delete tasks
* Task stages:

  * Todo
  * In Progress
  * Done

### 🎨 UI/UX

* Clean and minimal design
* Fully responsive layout
* Loading states for better UX
* Error handling for API failures
* Empty state handling

---

## 🛠 Tech Stack

### Frontend

* React (Vite)
* Axios
* CSS / Tailwind 

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* JWT Authentication
* REST APIs

---

## ⚙️ Installation & Setup

### Clone Repository

```bash
git clone https://github.com/aswathyy004/task-manager-app.git
cd task-manager-app
```

---

### Backend Setup

```bash
cd backend
npm install
npm start
```

Create `.env` file:

```env
PORT=5000
MONGO_URI=********
JWT_SECRET=********
```

---

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

Create `.env` file:

```env
VITE_API_URL=https://task-manager-backend-91xu.onrender.com/api
```

---

## 📌 Assumptions

* Each user manages their own task list
* Simple JWT authentication used for session handling
* No role-based access control implemented
* Focus was on functionality over complex UI

---

## ⚖️ Tradeoffs

* Kept UI minimal for faster development
* Used basic state management (no Redux)
* No advanced caching or optimization layers

---

## 🧠 Technical Decisions

* JWT chosen for stateless authentication
* REST API architecture for simplicity and clarity
* MongoDB used for flexible schema design
* React used for fast UI development and responsiveness

---

## 📷 Screenshots

* Login page
* Register page
* Dashboard

---

## ✅ Submission Checklist

* [x] Authentication implemented
* [x] Task CRUD functionality working
* [x] Responsive UI
* [x] Error and loading states handled
* [x] Frontend deployed
* [x] Backend deployed (bonus)
* [x] README completed

---

## 📌 Author

Built as part of an internship assignment — Task Manager App
