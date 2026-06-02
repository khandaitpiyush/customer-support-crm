import axios from "axios";

const api = axios.create({
baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
headers: {
"Content-Type": "application/json",
},
timeout: 10000,
});

// ── Types ──────────────────────────────────────────────

export interface TicketSummary {
ticketId: string;
customerName: string;
subject: string;
status: "Open" | "In Progress" | "Closed";
createdAt: string;
}

export interface Note {
_id: string;
text: string;
createdAt: string;
}

export interface Ticket extends TicketSummary {
_id: string;
customerEmail: string;
description: string;
notes: Note[];
updatedAt: string;
}

export interface CreateTicketPayload {
customerName: string;
customerEmail: string;
subject: string;
description: string;
}

export interface UpdateTicketPayload {
status?: string;
note?: string;
}

export interface TicketStats {
total: number;
open: number;
inProgress: number;
closed: number;
}

// ── API calls ──────────────────────────────────────────

export const ticketApi = {
getAll: (params?: { status?: string; search?: string }) =>
api.get<TicketSummary[]>("/tickets", { params }),

getById: (ticketId: string) =>
api.get<Ticket>(`/tickets/${ticketId}`),

create: (data: CreateTicketPayload) =>
api.post<{ ticketId: string; createdAt: string }>(
"/tickets",
data
),

update: (ticketId: string, data: UpdateTicketPayload) =>
api.put<{ success: boolean; updatedAt: string }>(
`/tickets/${ticketId}`,
data
),

getStats: () =>
api.get<TicketStats>("/tickets/stats"),
};

export default api;
