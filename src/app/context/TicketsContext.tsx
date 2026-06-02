import { createContext, useContext, useState, type ReactNode } from 'react';
import { type Ticket, type TicketStatus, initialTickets } from '../data/tickets';

interface TicketsContextValue {
  tickets: Ticket[];
  addTicket: (ticket: Ticket) => void;
  updateTicketStatus: (id: string, status: TicketStatus) => void;
  addComment: (ticketId: string, comment: { author: string; role: string; content: string; isInternal: boolean }) => void;
  getTicket: (id: string) => Ticket | undefined;
}

const TicketsContext = createContext<TicketsContextValue>({
  tickets: [],
  addTicket: () => {},
  updateTicketStatus: () => {},
  addComment: () => {},
  getTicket: () => undefined,
});

export function TicketsProvider({ children }: { children: ReactNode }) {
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);

  const addTicket = (ticket: Ticket) => {
    setTickets((prev) => [ticket, ...prev]);
  };

  const updateTicketStatus = (id: string, status: TicketStatus) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, status, updatedAt: new Date().toISOString() } : t
      )
    );
  };

  const addComment = (
    ticketId: string,
    comment: { author: string; role: string; content: string; isInternal: boolean }
  ) => {
    const newComment = {
      id: `c${Date.now()}`,
      ...comment,
      createdAt: new Date().toISOString(),
    };
    setTickets((prev) =>
      prev.map((t) =>
        t.id === ticketId
          ? { ...t, comments: [...t.comments, newComment], updatedAt: new Date().toISOString() }
          : t
      )
    );
  };

  const getTicket = (id: string) => tickets.find((t) => t.id === id);

  return (
    <TicketsContext.Provider value={{ tickets, addTicket, updateTicketStatus, addComment, getTicket }}>
      {children}
    </TicketsContext.Provider>
  );
}

export const useTickets = () => useContext(TicketsContext);
