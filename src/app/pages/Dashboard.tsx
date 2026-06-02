import { useMemo, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router';
import {
  Ticket,
  CheckCircle2,
  Clock3,
  InboxIcon,
  ChevronDown,
  TrendingUp,
} from 'lucide-react';
import { useTickets } from '../context/TicketsContext';
import { StatsCard } from '../components/StatsCard';
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

export function Dashboard() {
  const { tickets } = useTickets();
  const navigate = useNavigate();
  const { searchQuery } = useOutletContext<OutletCtx>();

  const [statusFilter, setStatusFilter] = useState<TicketStatus | 'all'>('all');
  const [priorityFilter, setPriorityFilter] = useState<TicketPriority | 'all'>('all');

  const stats = useMemo(() => ({
    total: tickets.length,
    open: tickets.filter((t) => t.status === 'open').length,
    inProgress: tickets.filter((t) => t.status === 'in_progress').length,
    closed: tickets.filter((t) => t.status === 'closed').length,
  }), [tickets]);

  const filtered = useMemo(() => {
    return tickets.filter((t) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        t.subject.toLowerCase().includes(q) ||
        t.customerName.toLowerCase().includes(q) ||
        t.customerEmail.toLowerCase().includes(q) ||
        t.id.toLowerCase().includes(q);
      const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
      const matchesPriority = priorityFilter === 'all' || t.priority === priorityFilter;
      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tickets, searchQuery, statusFilter, priorityFilter]);

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
      {/* Page header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Dashboard</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Overview of all customer support tickets
          </p>
        </div>
        <button
          onClick={() => navigate('/tickets/new')}
          className="flex items-center gap-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white px-3.5 py-2 text-sm font-medium transition-colors flex-shrink-0"
        >
          + New Ticket
        </button>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <StatsCard
          label="Total Tickets"
          value={stats.total}
          icon={Ticket}
          iconBg="bg-slate-100 dark:bg-slate-800"
          iconColor="text-slate-600 dark:text-slate-400"
          trend="All time"
        />
        <StatsCard
          label="Open"
          value={stats.open}
          icon={InboxIcon}
          iconBg="bg-blue-50 dark:bg-blue-900/30"
          iconColor="text-blue-600 dark:text-blue-400"
          trend="Needs attention"
        />
        <StatsCard
          label="In Progress"
          value={stats.inProgress}
          icon={Clock3}
          iconBg="bg-amber-50 dark:bg-amber-900/30"
          iconColor="text-amber-600 dark:text-amber-400"
          trend="Being worked on"
        />
        <StatsCard
          label="Closed"
          value={stats.closed}
          icon={CheckCircle2}
          iconBg="bg-emerald-50 dark:bg-emerald-900/30"
          iconColor="text-emerald-600 dark:text-emerald-400"
          trend="Resolved"
          trendUp
        />
      </div>

      {/* Resolution bar */}
      {stats.total > 0 && (
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Resolution Rate</span>
            </div>
            <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              {Math.round((stats.closed / stats.total) * 100)}%
            </span>
          </div>
          <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-emerald-500 transition-all duration-500"
              style={{ width: `${(stats.closed / stats.total) * 100}%` }}
            />
          </div>
          <div className="flex items-center gap-4 mt-2.5">
            <span className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
              <span className="h-2 w-2 rounded-full bg-blue-400 inline-block" />
              Open ({stats.open})
            </span>
            <span className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
              <span className="h-2 w-2 rounded-full bg-amber-400 inline-block" />
              In Progress ({stats.inProgress})
            </span>
            <span className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400 inline-block" />
              Closed ({stats.closed})
            </span>
          </div>
        </div>
      )}

      {/* Ticket list */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <h2 className="text-base font-semibold text-slate-800 dark:text-slate-200">
            All Tickets
            {filtered.length !== tickets.length && (
              <span className="ml-2 text-sm font-normal text-slate-400 dark:text-slate-500">
                {filtered.length} of {tickets.length}
              </span>
            )}
          </h2>
          <div className="flex items-center gap-2 flex-wrap">
            {/* Status filter */}
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as TicketStatus | 'all')}
                className="appearance-none pl-3 pr-8 py-1.5 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-700"
              >
                {statusOptions.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
            </div>

            {/* Priority filter */}
            <div className="relative">
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value as TicketPriority | 'all')}
                className="appearance-none pl-3 pr-8 py-1.5 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-700"
              >
                {priorityOptions.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>
        <TicketTable tickets={filtered} onCreateNew={() => navigate('/tickets/new')} />
      </div>
    </div>
  );
}
