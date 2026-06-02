import { NavLink } from 'react-router';
import {
  LayoutDashboard,
  Ticket,
  PlusCircle,
  BarChart2,
  Settings,
  HelpCircle,
  X,
  Zap,
} from 'lucide-react';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/tickets', label: 'All Tickets', icon: Ticket, end: false },
  { to: '/tickets/new', label: 'New Ticket', icon: PlusCircle, end: false },
  { to: '/analytics', label: 'Analytics', icon: BarChart2, end: false },
];

const bottomItems = [
  { to: '/settings', label: 'Settings', icon: Settings },
  { to: '/help', label: 'Help & Support', icon: HelpCircle },
];

function NavItem({ to, label, icon: Icon, end, onClick }: { to: string; label: string; icon: typeof LayoutDashboard; end?: boolean; onClick?: () => void }) {
  return (
    <NavLink
      to={to}
      end={end}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
          isActive
            ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 font-medium'
            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'
        }`
      }
    >
      <Icon className="h-4 w-4 flex-shrink-0" />
      {label}
    </NavLink>
  );
}

export function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <>
      {/* Overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 z-20 bg-black/30 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 flex flex-col w-60 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 transition-transform duration-200 md:relative md:translate-x-0 md:z-auto ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-14 px-4 border-b border-slate-200 dark:border-slate-700 flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-indigo-600 flex items-center justify-center">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <span className="font-semibold text-slate-900 dark:text-slate-100">SupportDesk</span>
          </div>
          <button
            onClick={onClose}
            className="md:hidden p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
          <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-3 mb-2">
            Main
          </p>
          {navItems.map((item) => (
            <NavItem key={item.to} {...item} onClick={onClose} />
          ))}
        </nav>

        {/* Bottom */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-700 space-y-0.5">
          {bottomItems.map((item) => (
            <NavItem key={item.to} {...item} onClick={onClose} />
          ))}
          {/* Agent info */}
          <div className="mt-3 px-3 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-800">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-semibold text-indigo-700 dark:text-indigo-300">AC</span>
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-slate-800 dark:text-slate-200 truncate">Alex Chen</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">Support Agent</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
