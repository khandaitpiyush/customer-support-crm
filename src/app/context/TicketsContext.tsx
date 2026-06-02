import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { type Ticket, type TicketStatus, normalizeTicket, denormalizeStatus } from '../data/tickets';

const API = import.meta.env.VITE_API_URL ?? 'http://localhost:5000';

interface TicketsContextValue {
  tickets: Ticket[];
  loading: boolean;
  addTicket: (data: Omit<Ticket, 'id' | '_id' | 'createdAt' | 'updatedAt' | 'comments'>) => Promise<Ticket>;
  updateTicketStatus: (id: string, status: TicketStatus) => Promise<void>;
  addComment: (ticketId: string, comment: { author: string; role: string; content: string; isInternal: boolean }) => Promise<void>;
  getTicket: (id: string) => Ticket | undefined;
  refreshTicket: (id: string) => Promise<void>;
}

const TicketsContext = createContext<TicketsContextValue>({
  tickets: [],
  loading: false,
  addTicket: async () => { throw new Error('not ready') },
  updateTicketStatus: async () => {},
  addComment: async () => {},
  getTicket: () => undefined,
  refreshTicket: async () => {},
});

export function TicketsProvider({ children }: { children: ReactNode }) {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/api/tickets`)
      .then((r) => r.json())
      .then((data) => setTickets(data.map(normalizeTicket)))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const addTicket = async (data: any): Promise<Ticket> => {
    const res = await fetch(`${API}/api/tickets`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(await res.text());
    const ticket = normalizeTicket(await res.json());
    setTickets((prev) => [ticket, ...prev]);
    return ticket;
  };

  const updateTicketStatus = async (id: string, status: TicketStatus) => {
    const res = await fetch(`${API}/api/tickets/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: denormalizeStatus(status) }),
    });
    if (!res.ok) throw new Error(await res.text());
    const updated = normalizeTicket(await res.json());
    setTickets((prev) => prev.map((t) => (t.id === id ? updated : t)));
  };

  const addComment = async (
    ticketId: string,
    comment: { author: string; role: string; content: string; isInternal: boolean }
  ) => {
    const res = await fetch(`${API}/api/tickets/${ticketId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ comment }),
    });
    if (!res.ok) throw new Error(await res.text());
    const updated = normalizeTicket(await res.json());
    setTickets((prev) => prev.map((t) => (t.id === ticketId ? updated : t)));
  };

  const refreshTicket = async (id: string) => {
    const res = await fetch(`${API}/api/tickets/${id}`);
    if (!res.ok) return;
    const updated = normalizeTicket(await res.json());
    setTickets((prev) => prev.map((t) => (t.id === id ? updated : t)));
  };

  const getTicket = (id: string) => tickets.find((t) => t.id === id);

  return (
    <TicketsContext.Provider value={{ tickets, loading, addTicket, updateTicketStatus, addComment, getTicket, refreshTicket }}>
      {children}
    </TicketsContext.Provider>
  );
}

export const useTickets = () => useContext(TicketsContext);