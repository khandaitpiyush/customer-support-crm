import Ticket from "../models/Ticket.js";

// POST /api/tickets
const createTicket = async (req, res, next) => {
  try {
    const {
      customerName,
      customerEmail,
      subject,
      description,
      priority,
      assignee,
      category,
    } = req.body;

    if (!customerName || !customerEmail || !subject || !description) {
      res.status(400);
      throw new Error("All fields are required.");
    }

    const ticket = await Ticket.create({
      customerName,
      customerEmail,
      subject,
      description,
      priority,
      assignee,
      category,
    });

    res.status(201).json(ticket);
  } catch (err) {
    next(err);
  }
};

// GET /api/tickets
const getAllTickets = async (req, res, next) => {
  try {
    const { status, search } = req.query;
    const filter = {};

    if (status && status !== "All") {
      filter.status = status;
    }

    if (search && search.trim()) {
      const regex = new RegExp(search.trim(), "i");
      filter.$or = [
        { ticketId: regex },
        { customerName: regex },
        { customerEmail: regex },
        { subject: regex },
        { description: regex },
      ];
    }

    const tickets = await Ticket.find(filter).sort({ createdAt: -1 });
    res.json(tickets);
  } catch (err) {
    next(err);
  }
};

// GET /api/tickets/:ticketId
const getTicketById = async (req, res, next) => {
  try {
    const ticket = await Ticket.findOne({ ticketId: req.params.ticketId });

    if (!ticket) {
      res.status(404);
      throw new Error("Ticket not found.");
    }

    res.json(ticket);
  } catch (err) {
    next(err);
  }
};

// PUT /api/tickets/:ticketId
const updateTicket = async (req, res, next) => {
  try {
    const { status, priority, assignee, category, comment } = req.body;
    const ticket = await Ticket.findOne({ ticketId: req.params.ticketId });

    if (!ticket) {
      res.status(404);
      throw new Error("Ticket not found.");
    }

    if (status) {
      const valid = ["Open", "In Progress", "Closed"];
      if (!valid.includes(status)) {
        res.status(400);
        throw new Error("Invalid status value.");
      }
      ticket.status = status;
    }

    if (priority) ticket.priority = priority;
    if (assignee) ticket.assignee = assignee;
    if (category) ticket.category = category;

    if (comment) {
      const { author, role, content, isInternal } = comment;
      if (!author || !role || !content) {
        res.status(400);
        throw new Error("Comment requires author, role, and content.");
      }
      ticket.comments.push({ author, role, content, isInternal: isInternal ?? false });
    }

    await ticket.save();
    res.json(ticket);
  } catch (err) {
    next(err);
  }
};

// GET /api/tickets/stats
const getStats = async (req, res, next) => {
  try {
    const [total, open, inProgress, closed] = await Promise.all([
      Ticket.countDocuments(),
      Ticket.countDocuments({ status: "Open" }),
      Ticket.countDocuments({ status: "In Progress" }),
      Ticket.countDocuments({ status: "Closed" }),
    ]);

    res.json({ total, open, inProgress, closed });
  } catch (err) {
    next(err);
  }
};

export { createTicket, getAllTickets, getTicketById, updateTicket, getStats };