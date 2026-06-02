import express from "express";
import {
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicket,
  getStats,
} from "../controllers/ticketController.js";

const router = express.Router();

// Stats must be before /:ticketId to avoid route conflict
router.get("/stats", getStats);

router.post("/", createTicket);
router.get("/", getAllTickets);
router.get("/:ticketId", getTicketById);
router.put("/:ticketId", updateTicket);

export default router;