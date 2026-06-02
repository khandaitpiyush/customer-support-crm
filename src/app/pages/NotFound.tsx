import { useNavigate } from 'react-router';
import { Home } from 'lucide-react';

export function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center">
      <p className="text-6xl font-bold text-slate-200 dark:text-slate-800 mb-2">404</p>
      <p className="text-slate-900 dark:text-slate-100 font-semibold mb-1">Page not found</p>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">The page you're looking for doesn't exist.</p>
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 text-sm font-medium transition-colors"
      >
        <Home className="h-4 w-4" />
        Back to Dashboard
      </button>
    </div>
  );
}
