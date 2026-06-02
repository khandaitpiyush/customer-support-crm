
# Support CRM System

A modern full-stack Customer Support Ticket CRM built with React, Node.js, Express, and MongoDB. The application allows teams to manage customer support tickets, track statuses, add notes/comments, and organize support workflows through a clean SaaS-style dashboard.

---

# Features

* Create Support Tickets
* View All Tickets
* Search Tickets
* Filter by Status
* Update Ticket Status
* Add Notes & Comments
* Responsive Dashboard UI
* REST API Integration
* MongoDB Database
* Clean Modular Architecture

---

# Tech Stack

## Frontend

* React
* TypeScript
* Tailwind CSS
* React Router
* Axios

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

## Deployment

* Frontend: Netlify
* Backend: Render
* Database: MongoDB Atlas

---

# Project Structure

```bash
support-crm/
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── layouts/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── config/
│   └── utils/
│
└── README.md
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/your-username/support-crm.git
cd support-crm
```

---

# Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Run backend:

```bash
npm run dev
```

---

# Frontend Setup

```bash
cd frontend
npm install
```

Run frontend:

```bash
npm run dev
```

---

# API Endpoints

## Create Ticket

```http
POST /api/tickets
```

## Get All Tickets

```http
GET /api/tickets
```

## Get Single Ticket

```http
GET /api/tickets/:id
```

## Update Ticket

```http
PUT /api/tickets/:id
```

---

# Environment Variables

## Backend `.env`

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

---

# Future Improvements

* Authentication & Authorization
* Role-based Access
* Email Notifications
* Analytics Dashboard
* Real-time Updates
* File Attachments


---



# Author

Piyush Khandait

Piyush Khandait
