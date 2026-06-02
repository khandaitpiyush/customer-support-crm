import { Lock } from 'lucide-react';
import type { Comment } from '../data/tickets';

interface CommentCardProps {
  comment: Comment;
}

function formatTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function initials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

const avatarColors = [
  'bg-violet-100 text-violet-700',
  'bg-blue-100 text-blue-700',
  'bg-emerald-100 text-emerald-700',
  'bg-amber-100 text-amber-700',
  'bg-rose-100 text-rose-700',
];

function getAvatarColor(name: string) {
  const idx = name.charCodeAt(0) % avatarColors.length;
  return avatarColors[idx];
}

export function CommentCard({ comment }: CommentCardProps) {
  return (
    <div className={`rounded-xl p-4 ${comment.isInternal ? 'bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-700/50' : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700'}`}>
      <div className="flex items-start gap-3">
        <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center text-xs font-semibold ${getAvatarColor(comment.author)}`}>
          {initials(comment.author)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="text-sm font-medium text-slate-900 dark:text-slate-100">{comment.author}</span>
            <span className="text-xs text-slate-500 dark:text-slate-400">{comment.role}</span>
            {comment.isInternal && (
              <span className="inline-flex items-center gap-1 text-xs text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/40 px-1.5 py-0.5 rounded">
                <Lock className="h-2.5 w-2.5" />
                Internal note
              </span>
            )}
            <span className="text-xs text-slate-400 dark:text-slate-500 ml-auto">{formatTime(comment.createdAt)}</span>
          </div>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">{comment.content}</p>
        </div>
      </div>
    </div>
  );
}
