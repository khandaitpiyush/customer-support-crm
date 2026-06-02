import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Menu, Search, Moon, Sun, Bell, Plus, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  onMenuToggle: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export function Navbar({ onMenuToggle, searchQuery, onSearchChange }: NavbarProps) {
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <header className="h-14 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 flex items-center gap-3 flex-shrink-0 sticky top-0 z-10">
      {/* Mobile menu button */}
      <button
        onClick={onMenuToggle}
        className="md:hidden p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Search */}
      <div className={`flex items-center gap-2 flex-1 max-w-md rounded-lg border transition-all px-3 py-1.5 ${
        searchFocused
          ? 'border-indigo-400 dark:border-indigo-500 bg-white dark:bg-slate-800 ring-2 ring-indigo-100 dark:ring-indigo-900/30'
          : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60'
      }`}>
        <Search className="h-4 w-4 text-slate-400 dark:text-slate-500 flex-shrink-0" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          placeholder="Search tickets…"
          className="flex-1 bg-transparent text-sm text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 outline-none"
        />
        {searchQuery && (
          <button onClick={() => onSearchChange('')} className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      <div className="ml-auto flex items-center gap-1.5">
        {/* New ticket */}
        <button
          onClick={() => navigate('/tickets/new')}
          className="hidden sm:flex items-center gap-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 text-sm font-medium transition-colors"
        >
          <Plus className="h-4 w-4" />
          New Ticket
        </button>

        {/* Notifications */}
        <button className="relative p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
        </button>

        {/* Dark mode toggle */}
        <button
          onClick={toggleTheme}
          className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors"
          title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
      </div>
    </header>
  );
}
