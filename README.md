🎫 Customer Support Ticket CRM

A modern full-stack Customer Support Ticket CRM built with React, TypeScript, Node.js, Express, and MongoDB. The platform enables support teams to efficiently manage customer issues through ticket creation, status tracking, comments, filtering, and a clean SaaS-style dashboard.

---

🌐 Live Demo

Frontend

"https://customer-support-crm.netlify.app/" (https://customer-support-crm.netlify.app/)

---

✨ Features

Ticket Management

- Create support tickets
- View all tickets
- View detailed ticket information
- Update ticket status
- Add internal notes/comments
- Ticket lifecycle tracking

Dashboard

- Total Tickets
- Open Tickets
- In Progress Tickets
- Closed Tickets
- Recent Ticket Activity

Search & Filtering

- Search tickets dynamically
- Filter tickets by status
- Quick ticket discovery

User Experience

- Responsive SaaS-style UI
- Clean dashboard layout
- Custom 404 Page
- Loading states
- Error handling
- React Router navigation

---

🛠️ Tech Stack

Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- Axios
- React Router

Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose

Deployment

- Frontend → Netlify
- Backend → Render

---

📁 Project Structure

Customer-Support-Ticket-CRM/
│
├── src/
│   ├── api/
│   ├── components/
│   ├── pages/
│   ├── layouts/
│   ├── context/
│   └── assets/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── server.js
│   └── package.json
│
├── public/
├── package.json
├── vite.config.ts
└── README.md

---

🗄️ Database Design

Ticket Schema

{
  ticketId,
  customerName,
  customerEmail,
  subject,
  description,
  status,
  priority,
  category,
  assignee,
  comments,
  createdAt,
  updatedAt
}

---

🚀 REST API Endpoints

Get All Tickets

GET /api/tickets

---

Get Ticket By ID

GET /api/tickets/:id

---

Create Ticket

POST /api/tickets

Example Request:

{
  "customerName": "John Doe",
  "customerEmail": "john@example.com",
  "subject": "Login Issue",
  "description": "Unable to access dashboard"
}

---

Update Ticket

PUT /api/tickets/:id

Example Request:

{
  "status": "Closed"
}

---

⚙️ Environment Variables

Backend (.env)

PORT=5000
MONGO_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:5173
NODE_ENV=development

---

Frontend (.env)

VITE_API_URL=http://localhost:5000/api

---

💻 Local Installation

Clone Repository

git clone https://github.com/your-username/customer-support-ticket-crm.git
cd customer-support-ticket-crm

---

Backend Setup

cd backend

npm install

npm run dev

Backend runs on:

http://localhost:5000

---

Frontend Setup

cd src

npm install


npm run dev

Frontend runs on:

http://localhost:5173

---

🌍 Production Deployment

Frontend (Netlify)

1. Build the project

npm run build

2. Upload the generated "dist" folder to Netlify

3. Configure environment variable:

VITE_API_URL=https://customer-support-crm-xsrt.onrender.com/api

---

Backend (Render)

Environment Variables

MONGO_URI=your_mongodb_connection_string
CLIENT_URL=https://customer-support-crm.netlify.app
NODE_ENV=production

Build Command

npm install

Start Command

npm start

---

📈 Key Highlights

- Full-stack CRM architecture
- RESTful API integration
- MongoDB data persistence
- Responsive SaaS-style dashboard
- Dynamic ticket management system
- Production deployment on Netlify & Render
- Reusable component architecture
- Real-time frontend/backend synchronization
- Search & filtering functionality
- Clean modular backend structure

---

📸 Screenshots

Add screenshots of:

- Dashboard
- Ticket List
- Ticket Details
- Create Ticket Form
- Search & Filter
- 404 Page

---

🔮 Future Improvements

- Authentication & Authorization
- Role-Based Access Control
- Email Notifications
- File Attachments
- Advanced Analytics
- Real-Time Updates
- Ticket Assignment Workflows

---

👨‍💻 Author

Piyush Khandait

Information Technology Engineering Student passionate about Full Stack Development, SaaS Products, and Scalable Software Engineering.

---

⭐ If you found this project useful, consider giving it a star.```

---

