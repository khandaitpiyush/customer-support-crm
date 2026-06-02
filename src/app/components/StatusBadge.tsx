import type { TicketStatus } from '../data/tickets';

interface StatusBadgeProps {
  status: TicketStatus;
  size?: 'sm' | 'md';
}

const config: Record<TicketStatus, { label: string; classes: string; dot: string }> = {
  open: {
    label: 'Open',
    classes: 'bg-blue-50 text-blue-700 ring-1 ring-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:ring-blue-700',
    dot: 'bg-blue-500',
  },
  in_progress: {
    label: 'In Progress',
    classes: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:ring-amber-700',
    dot: 'bg-amber-500',
  },
  closed: {
    label: 'Closed',
    classes: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:ring-emerald-700',
    dot: 'bg-emerald-500',
  },
};

export function StatusBadge({ status, size = 'sm' }: StatusBadgeProps) {
  const { label, classes, dot } = config[status];
  const sizeClass = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-sm';

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full font-medium ${sizeClass} ${classes}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {label}
    </span>
  );
}
