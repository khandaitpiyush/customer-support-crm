import { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { ChevronLeft, ChevronDown, AlertCircle } from 'lucide-react';
import { useTickets } from '../context/TicketsContext';
import type { TicketStatus, TicketPriority } from '../data/tickets';
import { agents, categories } from '../data/tickets';

interface FormData {
  customerName: string;
  customerEmail: string;
  subject: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  assignee: string;
  category: string;
}

interface FormErrors {
  customerName?: string;
  customerEmail?: string;
  subject?: string;
  description?: string;
}

function SelectField({
  label,
  value,
  onChange,
  options,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none pl-3 pr-9 py-2.5 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-700 focus:border-indigo-400 dark:focus:border-indigo-500 transition-all cursor-pointer"
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
      </div>
    </div>
  );
}

function InputField({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  required,
  error,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-3 py-2.5 text-sm rounded-lg border transition-all outline-none
          ${error
            ? 'border-red-400 dark:border-red-600 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-900/30'
            : 'border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-700 focus:border-indigo-400 dark:focus:border-indigo-500'
          }
          bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500`}
      />
      {error && (
        <p className="flex items-center gap-1 mt-1.5 text-xs text-red-600 dark:text-red-400">
          <AlertCircle className="h-3 w-3" />
          {error}
        </p>
      )}
    </div>
  );
}

export function CreateTicket() {
  const navigate = useNavigate();
  const { addTicket, tickets } = useTickets();
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState<FormData>({
    customerName: '',
    customerEmail: '',
    subject: '',
    description: '',
    status: 'open',
    priority: 'medium',
    assignee: 'Unassigned',
    category: 'General',
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const set = (key: keyof FormData) => (value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.customerName.trim()) newErrors.customerName = 'Customer name is required';
    if (!form.customerEmail.trim()) {
      newErrors.customerEmail = 'Customer email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.customerEmail)) {
      newErrors.customerEmail = 'Please enter a valid email address';
    }
    if (!form.subject.trim()) newErrors.subject = 'Subject is required';
    if (!form.description.trim()) newErrors.description = 'Description is required';
    else if (form.description.trim().length < 20) newErrors.description = 'Description must be at least 20 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));

    const nextNum = tickets.length + 1;
    const id = `TKT-${String(nextNum).padStart(3, '0')}`;

    const newTicket = {
      id,
      ...form,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      comments: [],
    };

    addTicket(newTicket);
    setSubmitting(false);

    toast.success('Ticket created successfully', {
      description: `${id} has been submitted.`,
    });

    navigate(`/tickets/${id}`);
  };

  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Create New Ticket</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Submit a new customer support request</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="space-y-4">
          {/* Customer info card */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5">
            <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
              Customer Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField
                label="Customer Name"
                value={form.customerName}
                onChange={set('customerName')}
                placeholder="Jane Smith"
                required
                error={errors.customerName}
              />
              <InputField
                label="Customer Email"
                value={form.customerEmail}
                onChange={set('customerEmail')}
                type="email"
                placeholder="jane@company.com"
                required
                error={errors.customerEmail}
              />
            </div>
          </div>

          {/* Ticket info card */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5">
            <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
              Ticket Details
            </h2>
            <div className="space-y-4">
              <InputField
                label="Subject"
                value={form.subject}
                onChange={set('subject')}
                placeholder="Brief summary of the issue"
                required
                error={errors.subject}
              />
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => set('description')(e.target.value)}
                  rows={5}
                  placeholder="Describe the issue in detail — what happened, expected behavior, steps to reproduce…"
                  className={`w-full px-3 py-2.5 text-sm rounded-lg border transition-all outline-none resize-none
                    ${errors.description
                      ? 'border-red-400 dark:border-red-600 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-900/30'
                      : 'border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-700 focus:border-indigo-400 dark:focus:border-indigo-500'
                    }
                    bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500`}
                />
                {errors.description && (
                  <p className="flex items-center gap-1 mt-1.5 text-xs text-red-600 dark:text-red-400">
                    <AlertCircle className="h-3 w-3" />
                    {errors.description}
                  </p>
                )}
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 text-right">
                  {form.description.length} characters
                </p>
              </div>
            </div>
          </div>

          {/* Settings card */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5">
            <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
              Ticket Settings
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <SelectField
                label="Status"
                value={form.status}
                onChange={set('status')}
                options={[
                  { value: 'open', label: 'Open' },
                  { value: 'in_progress', label: 'In Progress' },
                  { value: 'closed', label: 'Closed' },
                ]}
              />
              <SelectField
                label="Priority"
                value={form.priority}
                onChange={set('priority')}
                options={[
                  { value: 'high', label: 'High' },
                  { value: 'medium', label: 'Medium' },
                  { value: 'low', label: 'Low' },
                ]}
              />
              <SelectField
                label="Assign To"
                value={form.assignee}
                onChange={set('assignee')}
                options={agents.map((a) => ({ value: a, label: a }))}
              />
              <SelectField
                label="Category"
                value={form.category}
                onChange={set('category')}
                options={categories.map((c) => ({ value: c, label: c }))}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-1">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
              {submitting ? (
                <>
                  <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating…
                </>
              ) : (
                'Create Ticket'
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
