import { createBrowserRouter, Navigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import PrivateRoute from '@/components/shared/PrivateRoute';
import Overview from '@/pages/dashboard/Overview';
import Users from '@/pages/dashboard/Users';
import IncompleteUsers from '@/pages/dashboard/IncompleteUsers';
import Subscriptions from '@/pages/dashboard/Subscriptions';
import Support from '@/pages/dashboard/Support';
import Transactions from '@/pages/dashboard/Transactions';
import Terms from '@/pages/dashboard/Terms';
import EditTerms from '@/pages/dashboard/EditTerms';
import LoginPage from '@/pages/auth/Login';
import ForgotPassword from '@/pages/auth/ForgotPassword';
import VerifyOTP from '@/pages/auth/VerifyOTP';
import ResetPassword from '@/pages/auth/ResetPassword';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
  },
  {
    path: '/verify-otp',
    element: <VerifyOTP />,
  },
  {
    path: '/reset-password',
    element: <ResetPassword />,
  },
  {
    path: '/',
    element: <PrivateRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <Overview />,
          },
          {
            path: 'users',
            element: <Users />,
          },
          {
            path: 'incomplete-users',
            element: <IncompleteUsers />,
          },
          {
            path: 'subscription',
            element: <Subscriptions />,
          },
          {
            path: 'support',
            element: <Support />,
          },
          {
            path: 'transaction',
            element: <Transactions />,
          },
          {
            path: 'terms',
            children: [
              {
                index: true,
                element: <Terms />,
              },
              {
                path: 'edit',
                element: <EditTerms />,
              },
            ]
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);
