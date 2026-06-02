import { useState } from 'react';
import { Outlet } from 'react-router';
import { Toaster } from 'sonner';
import { Sidebar } from '../components/Sidebar';
import { Navbar } from '../components/Navbar';
import { ThemeProvider } from '../context/ThemeContext';
import { TicketsProvider } from '../context/TicketsContext';

export function Root() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <ThemeProvider>
      <TicketsProvider>
        <div className="flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden">
          <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

          <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
            <Navbar
              onMenuToggle={() => setSidebarOpen((p) => !p)}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
            <main className="flex-1 overflow-y-auto">
              <Outlet context={{ searchQuery, setSearchQuery }} />
            </main>
          </div>
        </div>
        <Toaster
          position="bottom-right"
          toastOptions={{
            classNames: {
              toast: 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 shadow-lg',
            },
          }}
        />
      </TicketsProvider>
    </ThemeProvider>
  );
}
