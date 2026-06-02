import { Inbox } from 'lucide-react';
import type { ReactNode } from 'react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({
  title = 'No tickets found',
  description = 'No tickets match your current filters. Try adjusting your search or create a new ticket.',
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="rounded-full bg-slate-100 dark:bg-slate-800 p-4 mb-4">
        <Inbox className="h-8 w-8 text-slate-400 dark:text-slate-500" />
      </div>
      <p className="text-slate-900 dark:text-slate-100 font-medium mb-1">{title}</p>
      <p className="text-slate-500 dark:text-slate-400 text-sm max-w-sm">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
