export function TicketRowSkeleton() {
  return (
    <div className="flex items-center gap-4 px-4 py-3.5 border-b border-slate-100 dark:border-slate-800 animate-pulse">
      <div className="h-3 w-20 rounded bg-slate-200 dark:bg-slate-700" />
      <div className="flex-1 h-3 rounded bg-slate-200 dark:bg-slate-700" />
      <div className="h-5 w-16 rounded-full bg-slate-200 dark:bg-slate-700" />
      <div className="h-5 w-12 rounded-md bg-slate-200 dark:bg-slate-700" />
      <div className="h-3 w-24 rounded bg-slate-200 dark:bg-slate-700" />
      <div className="h-3 w-20 rounded bg-slate-200 dark:bg-slate-700" />
    </div>
  );
}

export function StatsCardSkeleton() {
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="h-3 w-20 rounded bg-slate-200 dark:bg-slate-700" />
        <div className="h-8 w-8 rounded-lg bg-slate-200 dark:bg-slate-700" />
      </div>
      <div className="h-7 w-12 rounded bg-slate-200 dark:bg-slate-700 mb-1" />
      <div className="h-2.5 w-28 rounded bg-slate-100 dark:bg-slate-800" />
    </div>
  );
}
