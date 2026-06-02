import type { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  label: string;
  value: number;
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
  trend?: string;
  trendUp?: boolean;
}

export function StatsCard({ label, value, icon: Icon, iconColor, iconBg, trend, trendUp }: StatsCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 hover:shadow-sm transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
        <div className={`h-9 w-9 rounded-lg flex items-center justify-center ${iconBg}`}>
          <Icon className={`h-4 w-4 ${iconColor}`} />
        </div>
      </div>
      <p className="text-2xl font-semibold text-slate-900 dark:text-slate-100 tabular-nums">{value}</p>
      {trend && (
        <p className={`text-xs mt-1 ${trendUp ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-500'}`}>
          {trend}
        </p>
      )}
    </div>
  );
}
