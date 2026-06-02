import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import ticketRoutes from "./routes/ticketRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();

// Database Connection
connectDB();

// Middleware
app.use(
  cors({
    origin: (origin, callback) => {
      const allowed = [
        "https://customer-support-crm.netlify.app",
        "http://localhost:5173",
      ];
      if (!origin || allowed.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check Route
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
  });
});

// API Routes
app.use("/api/tickets", ticketRoutes);

// Error Middleware
app.use(notFound);
app.use(errorHandler);

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});