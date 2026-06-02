import { useNavigate } from 'react-router';
import type { Ticket } from '../data/tickets';
import { StatusBadge } from './StatusBadge';
import { PriorityBadge } from './PriorityBadge';
import { EmptyState } from './EmptyState';
import { TicketRowSkeleton } from './LoadingSkeleton';

interface TicketTableProps {
  tickets: Ticket[];
  loading?: boolean;
  onCreateNew?: () => void;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function TicketTable({ tickets, loading, onCreateNew }: TicketTableProps) {
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden">
        <div className="hidden md:grid grid-cols-[120px_1fr_120px_100px_140px_100px] gap-4 px-4 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">ID</span>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Subject</span>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Status</span>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Priority</span>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Customer</span>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Created</span>
        </div>
        {[...Array(5)].map((_, i) => <TicketRowSkeleton key={i} />)}
      </div>
    );
  }

  if (!tickets.length) {
    return (
      <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden">
        <EmptyState
          action={
            onCreateNew ? (
              <button
                onClick={onCreateNew}
                className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700 transition-colors"
              >
                Create a ticket
              </button>
            ) : undefined
          }
        />
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden">
      {/* Header */}
      <div className="hidden md:grid grid-cols-[120px_1fr_130px_100px_160px_120px] gap-4 px-4 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">ID</span>
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Subject</span>
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Status</span>
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Priority</span>
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Customer</span>
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Created</span>
      </div>

      {/* Rows */}
      {tickets.map((ticket, i) => (
        <div
          key={ticket.id}
          onClick={() => navigate(`/tickets/${ticket.id}`)}
          className={`group cursor-pointer transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/60 ${i !== tickets.length - 1 ? 'border-b border-slate-100 dark:border-slate-800' : ''}`}
        >
          {/* Desktop row */}
          <div className="hidden md:grid grid-cols-[120px_1fr_130px_100px_160px_120px] gap-4 px-4 py-3.5 items-center">
            <span className="text-sm font-mono text-slate-500 dark:text-slate-400">{ticket.id}</span>
            <div>
              <p className="text-sm font-medium text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">
                {ticket.subject}
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5 truncate">{ticket.category}</p>
            </div>
            <StatusBadge status={ticket.status} />
            <PriorityBadge priority={ticket.priority} />
            <div>
              <p className="text-sm text-slate-700 dark:text-slate-300 truncate">{ticket.customerName}</p>
              <p className="text-xs text-slate-400 dark:text-slate-500 truncate">{ticket.customerEmail}</p>
            </div>
            <span className="text-sm text-slate-500 dark:text-slate-400">{formatDate(ticket.createdAt)}</span>
          </div>

          {/* Mobile row */}
          <div className="md:hidden px-4 py-3.5">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">{ticket.subject}</p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{ticket.id} · {ticket.customerName}</p>
              </div>
              <StatusBadge status={ticket.status} />
            </div>
            <div className="flex items-center gap-2">
              <PriorityBadge priority={ticket.priority} />
              <span className="text-xs text-slate-400 dark:text-slate-500">{formatDate(ticket.createdAt)}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
