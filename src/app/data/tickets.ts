export type TicketStatus = 'open' | 'in_progress' | 'closed';
export type TicketPriority = 'low' | 'medium' | 'high';

export interface Comment {
  _id: string;
  author: string;
  role: string;
  content: string;
  isInternal: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Ticket {
  id: string;        // mapped from ticketId
  _id: string;       // mongo id
  subject: string;
  customerName: string;
  customerEmail: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  assignee: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  comments: Comment[];
}

export const agents = ['Alex Chen', 'Priya Sharma', 'David Park', 'Jordan Lee', 'Unassigned'];
export const categories = ['Authentication', 'Billing', 'Bug Report', 'Feature Request', 'Account', 'General'];

// Normalize backend → frontend
export function normalizeTicket(raw: any): Ticket {
  return {
    ...raw,
    id: raw.ticketId,
    status: raw.status === 'In Progress' ? 'in_progress' : raw.status.toLowerCase() as TicketStatus,
  };
}

// Normalize frontend → backend
export function denormalizeStatus(status: TicketStatus): string {
  if (status === 'in_progress') return 'In Progress';
  return status.charAt(0).toUpperCase() + status.slice(1);
}