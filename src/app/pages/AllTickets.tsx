import { useMemo, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router';
import { ChevronDown } from 'lucide-react';
import { useTickets } from '../context/TicketsContext';
import { TicketTable } from '../components/TicketTable';
import type { TicketStatus, TicketPriority } from '../data/tickets';

type OutletCtx = { searchQuery: string };

const statusOptions: { value: TicketStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'All Status' },
  { value: 'open', label: 'Open' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'closed', label: 'Closed' },
];

const priorityOptions: { value: TicketPriority | 'all'; label: string }[] = [
  { value: 'all', label: 'All Priority' },
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
];

const categoryOptions = ['All Categories', 'Authentication', 'Billing', 'Bug Report', 'Feature Request', 'Account', 'General'];

export function AllTickets() {
  const { tickets } = useTickets();
  const navigate = useNavigate();
  const { searchQuery } = useOutletContext<OutletCtx>();
  const [statusFilter, setStatusFilter] = useState<TicketStatus | 'all'>('all');
  const [priorityFilter, setPriorityFilter] = useState<TicketPriority | 'all'>('all');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'priority'>('newest');

  const filtered = useMemo(() => {
    let result = tickets.filter((t) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        t.subject.toLowerCase().includes(q) ||
        t.customerName.toLowerCase().includes(q) ||
        t.customerEmail.toLowerCase().includes(q) ||
        t.id.toLowerCase().includes(q);
      const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
      const matchesPriority = priorityFilter === 'all' || t.priority === priorityFilter;
      const matchesCategory = categoryFilter === 'All Categories' || t.category === categoryFilter;
      return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
    });

    if (sortBy === 'newest') result = result.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    else if (sortBy === 'oldest') result = result.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
    else if (sortBy === 'priority') {
      const order = { high: 0, medium: 1, low: 2 };
      result = result.sort((a, b) => order[a.priority] - order[b.priority]);
    }
    return result;
  }, [tickets, searchQuery, statusFilter, priorityFilter, categoryFilter, sortBy]);

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">All Tickets</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            {filtered.length} of {tickets.length} tickets
          </p>
        </div>
        <button
          onClick={() => navigate('/tickets/new')}
          className="flex items-center gap-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white px-3.5 py-2 text-sm font-medium transition-colors flex-shrink-0"
        >
          + New Ticket
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        {[
          { value: statusFilter, onChange: (v: string) => setStatusFilter(v as TicketStatus | 'all'), options: statusOptions },
          { value: priorityFilter, onChange: (v: string) => setPriorityFilter(v as TicketPriority | 'all'), options: priorityOptions },
        ].map((f, i) => (
          <div key={i} className="relative">
            <select
              value={f.value}
              onChange={(e) => f.onChange(e.target.value)}
              className="appearance-none pl-3 pr-8 py-1.5 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-700"
            >
              {f.options.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
          </div>
        ))}

        <div className="relative">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="appearance-none pl-3 pr-8 py-1.5 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-700"
          >
            {categoryOptions.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
        </div>

        <div className="relative ml-auto">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="appearance-none pl-3 pr-8 py-1.5 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-700"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="priority">By priority</option>
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
        </div>
      </div>

      <TicketTable tickets={filtered} onCreateNew={() => navigate('/tickets/new')} />
    </div>
  );
}
