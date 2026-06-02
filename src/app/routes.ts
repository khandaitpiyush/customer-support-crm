import { createBrowserRouter } from 'react-router';
import { Root } from './layouts/Root';
import { Dashboard } from './pages/Dashboard';
import { AllTickets } from './pages/AllTickets';
import { CreateTicket } from './pages/CreateTicket';
import { TicketDetail } from './pages/TicketDetail';
import { Analytics } from './pages/Analytics';
import { NotFound } from './pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: Dashboard },
      { path: 'tickets', Component: AllTickets },
      { path: 'tickets/new', Component: CreateTicket },
      { path: 'tickets/:id', Component: TicketDetail },
      { path: 'analytics', Component: Analytics },
      { path: '*', Component: NotFound },
    ],
  },
]);
