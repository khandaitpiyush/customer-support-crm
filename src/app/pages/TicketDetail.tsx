import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'sonner';
import {
  ChevronLeft,
  User,
  Mail,
  Calendar,
  Tag,
  UserCircle,
  MessageSquare,
  Lock,
  Send,
} from 'lucide-react';
import { useTickets } from '../context/TicketsContext';
import { StatusBadge } from '../components/StatusBadge';
import { PriorityBadge } from '../components/PriorityBadge';
import { CommentCard } from '../components/CommentCard';
import { EmptyState } from '../components/EmptyState';
import type { TicketStatus } from '../data/tickets';

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function DetailRow({ icon: Icon, label, value }: { icon: typeof User; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-slate-100 dark:border-slate-800 last:border-0">
      <div className="flex items-center gap-2 w-28 flex-shrink-0">
        <Icon className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500" />
        <span className="text-xs text-slate-500 dark:text-slate-400">{label}</span>
      </div>
      <span className="text-sm text-slate-800 dark:text-slate-200 break-all">{value}</span>
    </div>
  );
}

const statusOptions: { value: TicketStatus; label: string }[] = [
  { value: 'open', label: 'Open' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'closed', label: 'Closed' },
];

export function TicketDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getTicket, updateTicketStatus, addComment } = useTickets();

  const ticket = getTicket(id!);

  const [commentText, setCommentText] = useState('');
  const [isInternal, setIsInternal] = useState(false);
  const [submittingComment, setSubmittingComment] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  if (!ticket) {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors mb-4"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </button>
        <EmptyState
          title="Ticket not found"
          description="This ticket does not exist or may have been deleted."
          action={
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700 transition-colors"
            >
              Go to Dashboard
            </button>
          }
        />
      </div>
    );
  }

  const handleStatusChange = async (status: TicketStatus) => {
    if (status === ticket.status) return;
    setUpdatingStatus(true);
    await new Promise((r) => setTimeout(r, 400));
    updateTicketStatus(ticket.id, status);
    setUpdatingStatus(false);
    toast.success(`Status updated to ${status.replace('_', ' ')}`);
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setSubmittingComment(true);
    await new Promise((r) => setTimeout(r, 500));
    addComment(ticket.id, {
      author: 'Alex Chen',
      role: 'Support Agent',
      content: commentText.trim(),
      isInternal,
    });
    setCommentText('');
    setSubmittingComment(false);
    toast.success(isInternal ? 'Internal note added' : 'Reply sent');
  };

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto">
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors mb-4"
      >
        <ChevronLeft className="h-4 w-4" />
        Back to tickets
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-4">
          {/* Ticket header */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5">
            <div className="flex items-start gap-3 mb-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="text-xs font-mono text-slate-400 dark:text-slate-500">{ticket.id}</span>
                  <StatusBadge status={ticket.status} />
                  <PriorityBadge priority={ticket.priority} />
                </div>
                <h1 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{ticket.subject}</h1>
              </div>
            </div>
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line">{ticket.description}</p>
            </div>
          </div>

          {/* Timeline / Activity */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="h-4 w-4 text-slate-500 dark:text-slate-400" />
              <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Activity & Comments
                {ticket.comments.length > 0 && (
                  <span className="ml-1.5 text-xs font-normal text-slate-400 dark:text-slate-500">
                    ({ticket.comments.length})
                  </span>
                )}
              </h2>
            </div>

            {ticket.comments.length === 0 ? (
              <div className="py-6 text-center">
                <MessageSquare className="h-6 w-6 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
                <p className="text-sm text-slate-400 dark:text-slate-500">No comments yet. Be the first to reply.</p>
              </div>
            ) : (
              <div className="space-y-3 mb-4">
                {/* Created event */}
                <div className="flex items-center gap-2.5 py-1">
                  <div className="h-5 w-5 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-400 dark:bg-slate-500" />
                  </div>
                  <p className="text-xs text-slate-400 dark:text-slate-500">
                    Ticket created by {ticket.customerName} · {formatDate(ticket.createdAt)}
                  </p>
                </div>
                {ticket.comments.map((comment) => (
                  <CommentCard key={comment.id} comment={comment} />
                ))}
              </div>
            )}

            {/* Add comment */}
            <form onSubmit={handleAddComment} className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="mb-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsInternal(false)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    !isInternal
                      ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                      : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Send className="h-3 w-3" />
                  Reply to customer
                </button>
                <button
                  type="button"
                  onClick={() => setIsInternal(true)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    isInternal
                      ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400'
                      : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Lock className="h-3 w-3" />
                  Internal note
                </button>
              </div>
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                rows={3}
                placeholder={isInternal ? 'Add an internal note for your team…' : 'Write a reply to the customer…'}
                className={`w-full px-3 py-2.5 text-sm rounded-lg border transition-all outline-none resize-none
                  ${isInternal
                    ? 'border-amber-200 dark:border-amber-700/50 bg-amber-50/50 dark:bg-amber-900/10 focus:ring-2 focus:ring-amber-200 dark:focus:ring-amber-900/30'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-700 focus:border-indigo-400 dark:focus:border-indigo-500'
                  }
                  text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500`}
              />
              <div className="flex justify-end mt-2">
                <button
                  type="submit"
                  disabled={!commentText.trim() || submittingComment}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {submittingComment ? (
                    <span className="h-3.5 w-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Send className="h-3.5 w-3.5" />
                  )}
                  {isInternal ? 'Add note' : 'Send reply'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Sidebar panel */}
        <div className="space-y-4">
          {/* Status update */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4">
            <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Update Status</h3>
            <div className="space-y-1.5">
              {statusOptions.map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => handleStatusChange(value)}
                  disabled={updatingStatus}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors text-left
                    ${ticket.status === value
                      ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 font-medium'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }
                    disabled:opacity-60 disabled:cursor-wait`}
                >
                  <StatusBadge status={value} />
                  {ticket.status === value && (
                    <span className="ml-auto text-xs text-indigo-500 dark:text-indigo-400">Current</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Ticket info */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4">
            <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Ticket Info</h3>
            <div>
              <DetailRow icon={User} label="Customer" value={ticket.customerName} />
              <DetailRow icon={Mail} label="Email" value={ticket.customerEmail} />
              <DetailRow icon={Tag} label="Category" value={ticket.category} />
              <DetailRow icon={UserCircle} label="Assignee" value={ticket.assignee} />
              <DetailRow icon={Calendar} label="Created" value={formatDate(ticket.createdAt)} />
              <DetailRow icon={Calendar} label="Updated" value={formatDate(ticket.updatedAt)} />
            </div>
          </div>

          {/* Priority */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4">
            <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Priority</h3>
            <PriorityBadge priority={ticket.priority} />
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">
              {ticket.priority === 'high'
                ? 'Requires immediate attention'
                : ticket.priority === 'medium'
                ? 'Should be resolved this week'
                : 'Can be addressed when bandwidth allows'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
