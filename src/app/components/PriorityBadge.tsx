import type { TicketPriority } from '../data/tickets';

interface PriorityBadgeProps {
  priority: TicketPriority;
}

const config: Record<TicketPriority, { label: string; classes: string }> = {
  high: {
    label: 'High',
    classes: 'bg-red-50 text-red-700 ring-1 ring-red-200 dark:bg-red-900/30 dark:text-red-300 dark:ring-red-700',
  },
  medium: {
    label: 'Medium',
    classes: 'bg-orange-50 text-orange-700 ring-1 ring-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:ring-orange-700',
  },
  low: {
    label: 'Low',
    classes: 'bg-slate-100 text-slate-600 ring-1 ring-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:ring-slate-600',
  },
};

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  const { label, classes } = config[priority];
  return (
    <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${classes}`}>
      {label}
    </span>
  );
}
