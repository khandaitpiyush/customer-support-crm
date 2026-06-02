export type TicketStatus = 'open' | 'in_progress' | 'closed';
export type TicketPriority = 'low' | 'medium' | 'high';

export interface Comment {
  id: string;
  author: string;
  role: string;
  content: string;
  createdAt: string;
  isInternal: boolean;
}

export interface Ticket {
  id: string;
  subject: string;
  customerName: string;
  customerEmail: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  createdAt: string;
  updatedAt: string;
  assignee: string;
  category: string;
  comments: Comment[];
}

export const initialTickets: Ticket[] = [
  {
    id: 'TKT-001',
    subject: 'Unable to login to dashboard',
    customerName: 'Sarah Johnson',
    customerEmail: 'sarah.johnson@acme.com',
    description:
      'I have been unable to login to my dashboard since yesterday morning. I keep getting an "Invalid credentials" error even though I am sure my password is correct. I have tried resetting my password twice but the issue persists. This is blocking my entire team.',
    status: 'open',
    priority: 'high',
    createdAt: '2026-05-30T09:23:00Z',
    updatedAt: '2026-05-30T11:45:00Z',
    assignee: 'Alex Chen',
    category: 'Authentication',
    comments: [
      {
        id: 'c1',
        author: 'Alex Chen',
        role: 'Support Agent',
        content:
          'Hi Sarah, thank you for reaching out. I can see your account is active in our system. Could you please try clearing your browser cache and cookies, then attempt to log in again? Also, could you let us know which browser you are using?',
        createdAt: '2026-05-30T11:45:00Z',
        isInternal: false,
      },
      {
        id: 'c2',
        author: 'Alex Chen',
        role: 'Support Agent',
        content:
          'Internal note: Checked account in admin panel — no rate limiting or lockout issues found. Suspect a cached session token conflict. Will follow up with engineering if clearing cache does not resolve.',
        createdAt: '2026-05-30T11:50:00Z',
        isInternal: true,
      },
    ],
  },
  {
    id: 'TKT-002',
    subject: 'Payment failed but amount was deducted',
    customerName: 'Marcus Williams',
    customerEmail: 'marcus.w@techcorp.io',
    description:
      'I attempted to upgrade my plan to Professional yesterday. The payment failed according to the app but my bank shows the charge went through. The amount of $99 was deducted from my account and I have not received the plan upgrade.',
    status: 'in_progress',
    priority: 'high',
    createdAt: '2026-05-29T14:10:00Z',
    updatedAt: '2026-05-30T09:00:00Z',
    assignee: 'Priya Sharma',
    category: 'Billing',
    comments: [
      {
        id: 'c3',
        author: 'Priya Sharma',
        role: 'Billing Specialist',
        content:
          "Hi Marcus, I've escalated this to our billing team. We can confirm the charge and will process a refund within 3–5 business days if the upgrade did not complete. I'll also manually activate your Professional plan in the meantime.",
        createdAt: '2026-05-30T09:00:00Z',
        isInternal: false,
      },
    ],
  },
  {
    id: 'TKT-003',
    subject: 'CSV export not working for large datasets',
    customerName: 'Emily Rodriguez',
    customerEmail: 'emily@dataflow.co',
    description:
      'When I try to export reports with more than 10,000 rows to CSV, the download fails or produces an empty file. Smaller exports (under 1,000 rows) work fine. This is reproducible every time on Chrome and Firefox.',
    status: 'in_progress',
    priority: 'medium',
    createdAt: '2026-05-28T16:33:00Z',
    updatedAt: '2026-05-29T10:22:00Z',
    assignee: 'David Park',
    category: 'Bug Report',
    comments: [
      {
        id: 'c4',
        author: 'David Park',
        role: 'Support Engineer',
        content:
          "Hi Emily, thank you for the detailed report. I've been able to reproduce the issue internally. Our engineering team is looking into the export timeout limit. We'll have an update within 48 hours.",
        createdAt: '2026-05-29T10:22:00Z',
        isInternal: false,
      },
    ],
  },
  {
    id: 'TKT-004',
    subject: 'Feature request: Bulk user import via CSV',
    customerName: 'James Thompson',
    customerEmail: 'james.t@enterprise.com',
    description:
      'We have 500+ employees to onboard and the current one-by-one user creation process is very time consuming. A CSV bulk import feature would save us hours of work. We have a specific column format we use — happy to share it if that helps.',
    status: 'open',
    priority: 'low',
    createdAt: '2026-05-27T11:00:00Z',
    updatedAt: '2026-05-27T11:00:00Z',
    assignee: 'Unassigned',
    category: 'Feature Request',
    comments: [],
  },
  {
    id: 'TKT-005',
    subject: 'API rate limit too restrictive on free plan',
    customerName: 'Aisha Patel',
    customerEmail: 'aisha@startuplab.dev',
    description:
      'The 100 req/min rate limit on the free plan is blocking our development workflow. We are actively evaluating your product for our startup and a temporary increase would help us properly test the integration before committing to a paid plan.',
    status: 'closed',
    priority: 'medium',
    createdAt: '2026-05-25T08:15:00Z',
    updatedAt: '2026-05-26T14:30:00Z',
    assignee: 'Alex Chen',
    category: 'Account',
    comments: [
      {
        id: 'c5',
        author: 'Alex Chen',
        role: 'Support Agent',
        content:
          "Hi Aisha, I've applied a temporary rate limit increase to 500 req/min for 30 days on your account. This should give you enough room to fully evaluate our product. Feel free to reach out if you need anything else during your trial!",
        createdAt: '2026-05-26T14:30:00Z',
        isInternal: false,
      },
    ],
  },
  {
    id: 'TKT-006',
    subject: 'Dashboard widgets not loading after update',
    customerName: 'Robert Kim',
    customerEmail: 'r.kim@globalops.com',
    description:
      'Since the update deployed yesterday evening, several dashboard widgets show a loading spinner indefinitely and never display data. Specifically the "Revenue Overview" and "Active Users" widgets are affected. Other widgets seem fine.',
    status: 'closed',
    priority: 'high',
    createdAt: '2026-05-24T13:45:00Z',
    updatedAt: '2026-05-25T10:00:00Z',
    assignee: 'David Park',
    category: 'Bug Report',
    comments: [
      {
        id: 'c6',
        author: 'David Park',
        role: 'Support Engineer',
        content:
          'Hi Robert, we identified a caching issue introduced in the v2.4.1 release that affected widget data loading. A hotfix has been deployed. Please hard-refresh your browser (Ctrl+Shift+R) and confirm the widgets are working.',
        createdAt: '2026-05-25T10:00:00Z',
        isInternal: false,
      },
    ],
  },
  {
    id: 'TKT-007',
    subject: 'Need invoices for tax filing (FY 2025–26)',
    customerName: 'Linda Chen',
    customerEmail: 'linda@finance-co.com',
    description:
      'Could you please send me invoices for all payments made during FY 2025–2026? Our accountant needs them for our annual tax filing. I can see payments in the billing portal but cannot download individual invoices for some reason.',
    status: 'open',
    priority: 'low',
    createdAt: '2026-05-31T07:30:00Z',
    updatedAt: '2026-05-31T07:30:00Z',
    assignee: 'Priya Sharma',
    category: 'Billing',
    comments: [],
  },
  {
    id: 'TKT-008',
    subject: 'SSO integration failing with Okta SAML',
    customerName: 'Michael Scott',
    customerEmail: 'm.scott@papyrus.com',
    description:
      'We are trying to set up SSO with Okta for our enterprise account but keep getting a SAML assertion validation error. Our IT team has followed your documentation exactly. The error message is: "SAML Response signature could not be verified."',
    status: 'in_progress',
    priority: 'high',
    createdAt: '2026-05-31T10:00:00Z',
    updatedAt: '2026-05-31T12:00:00Z',
    assignee: 'Alex Chen',
    category: 'Authentication',
    comments: [
      {
        id: 'c7',
        author: 'Alex Chen',
        role: 'Support Agent',
        content:
          "Hi Michael, this sounds like it could be a certificate mismatch. Could you please share a screenshot of your Okta SAML settings (with sensitive fields redacted)? Also, confirm whether you're using SP-initiated or IdP-initiated SSO flow.",
        createdAt: '2026-05-31T12:00:00Z',
        isInternal: false,
      },
    ],
  },
];

export const agents = ['Alex Chen', 'Priya Sharma', 'David Park', 'Jordan Lee', 'Unassigned'];
export const categories = ['Authentication', 'Billing', 'Bug Report', 'Feature Request', 'Account', 'General'];
