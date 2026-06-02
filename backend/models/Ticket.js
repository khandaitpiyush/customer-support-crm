import mongoose from "mongoose";
import generateTicketId from "../utils/generateTicketId.js";

const commentSchema = new mongoose.Schema(
  {
    author: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    content: { type: String, required: true, trim: true },
    isInternal: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const ticketSchema = new mongoose.Schema(
  {
    ticketId: {
      type: String,
      unique: true,
      default: generateTicketId,
    },
    customerName: { type: String, required: true, trim: true },
    customerEmail: { type: String, required: true, trim: true, lowercase: true },
    subject: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ["Open", "In Progress", "Closed"],
      default: "Open",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    assignee: { type: String, trim: true, default: "Unassigned" },
    category: { type: String, trim: true, default: "General" },
    comments: [commentSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Ticket", ticketSchema);