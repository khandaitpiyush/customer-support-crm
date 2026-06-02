import { useMemo } from 'react';
import { BarChart2, TrendingUp, Clock, CheckCircle2 } from 'lucide-react';
import { useTickets } from '../context/TicketsContext';
import { categories } from '../data/tickets';

export function Analytics() {
  const { tickets } = useTickets();

  const stats = useMemo(() => {
    const byStatus = {
      open: tickets.filter((t) => t.status === 'open').length,
      in_progress: tickets.filter((t) => t.status === 'in_progress').length,
      closed: tickets.filter((t) => t.status === 'closed').length,
    };
    const byPriority = {
      high: tickets.filter((t) => t.priority === 'high').length,
      medium: tickets.filter((t) => t.priority === 'medium').length,
      low: tickets.filter((t) => t.priority === 'low').length,
    };
    const byCategory = categories.map((cat) => ({
      label: cat,
      count: tickets.filter((t) => t.category === cat).length,
    })).filter((c) => c.count > 0);
    const byAgent = ['Alex Chen', 'Priya Sharma', 'David Park', 'Jordan Lee'].map((agent) => ({
      label: agent,
      count: tickets.filter((t) => t.assignee === agent).length,
    }));
    const resolutionRate = tickets.length ? Math.round((byStatus.closed / tickets.length) * 100) : 0;
    return { byStatus, byPriority, byCategory, byAgent, resolutionRate };
  }, [tickets]);

  const max = Math.max(...stats.byCategory.map((c) => c.count), 1);
  const agentMax = Math.max(...stats.byAgent.map((a) => a.count), 1);

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Analytics</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Support performance overview</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-4 w-4 text-emerald-500" />
            <p className="text-sm text-slate-500 dark:text-slate-400">Resolution Rate</p>
          </div>
          <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">{stats.resolutionRate}%</p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-4 w-4 text-amber-500" />
            <p className="text-sm text-slate-500 dark:text-slate-400">Open Tickets</p>
          </div>
          <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">{stats.byStatus.open}</p>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4 col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="h-4 w-4 text-blue-500" />
            <p className="text-sm text-slate-500 dark:text-slate-400">Total Tickets</p>
          </div>
          <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">{tickets.length}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Status distribution */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5">
          <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">Status Distribution</h2>
          <div className="space-y-3">
            {[
              { label: 'Open', value: stats.byStatus.open, color: 'bg-blue-500', total: tickets.length },
              { label: 'In Progress', value: stats.byStatus.in_progress, color: 'bg-amber-500', total: tickets.length },
              { label: 'Closed', value: stats.byStatus.closed, color: 'bg-emerald-500', total: tickets.length },
            ].map(({ label, value, color, total }) => (
              <div key={label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600 dark:text-slate-400">{label}</span>
                  <span className="text-slate-900 dark:text-slate-100 font-medium">{value}</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${color} transition-all duration-700`}
                    style={{ width: total ? `${(value / total) * 100}%` : '0%' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Priority distribution */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5">
          <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">Priority Breakdown</h2>
          <div className="space-y-3">
            {[
              { label: 'High', value: stats.byPriority.high, color: 'bg-red-500' },
              { label: 'Medium', value: stats.byPriority.medium, color: 'bg-orange-400' },
              { label: 'Low', value: stats.byPriority.low, color: 'bg-slate-400' },
            ].map(({ label, value, color }) => (
              <div key={label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600 dark:text-slate-400">{label}</span>
                  <span className="text-slate-900 dark:text-slate-100 font-medium">{value}</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${color} transition-all duration-700`}
                    style={{ width: tickets.length ? `${(value / tickets.length) * 100}%` : '0%' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* By category */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5">
          <div className="flex items-center gap-2 mb-4">
            <BarChart2 className="h-4 w-4 text-slate-500 dark:text-slate-400" />
            <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Tickets by Category</h2>
          </div>
          <div className="space-y-2.5">
            {stats.byCategory.map(({ label, count }) => (
              <div key={label} className="flex items-center gap-3">
                <span className="text-sm text-slate-600 dark:text-slate-400 w-28 flex-shrink-0 truncate">{label}</span>
                <div className="flex-1 h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-indigo-500 transition-all duration-700"
                    style={{ width: `${(count / max) * 100}%` }}
                  />
                </div>
                <span className="text-sm text-slate-700 dark:text-slate-300 w-4 text-right">{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* By agent */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5">
          <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">Tickets by Agent</h2>
          <div className="space-y-2.5">
            {stats.byAgent.map(({ label, count }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="h-6 w-6 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center flex-shrink-0">
                  <span className="text-[10px] font-semibold text-indigo-700 dark:text-indigo-300">
                    {label.split(' ').map((n) => n[0]).join('')}
                  </span>
                </div>
                <span className="text-sm text-slate-600 dark:text-slate-400 flex-1 truncate">{label}</span>
                <div className="w-20 h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-violet-500 transition-all duration-700"
                    style={{ width: `${(count / agentMax) * 100}%` }}
                  />
                </div>
                <span className="text-sm text-slate-700 dark:text-slate-300 w-4 text-right">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
