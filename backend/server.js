import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

import connectDB from "./config/db.js";
import ticketRoutes from "./routes/ticketRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || "*",
}));
app.use(express.json());

// Routes
app.get("/health", (req, res) => res.json({ status: "ok" }));
app.use("/api/tickets", ticketRoutes);

// Error handling — must be last
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});