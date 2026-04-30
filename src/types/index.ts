export interface User {
  id: string;
  name: string;
  email: string;
  subscription: 'Basic' | 'Pro' | 'Free';
  totalGenerated: number;
  totalHours: string;
  accountCreated: string;
  status: 'Active' | 'Blocked';
  avatar?: string;
}

export interface IncompleteUser {
  id: string;
  name: string;
  email: string;
  accountCreated: string;
  avatar?: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: string;
  subscribedUsers: number;
  videoGenerated: number;
  totalDuration: string;
}

export interface SupportTicket {
  id: string;
  name: string;
  email: string;
  subject: string;
  status: 'Pending' | 'Resolved';
  date: string;
  message?: string;
}

export interface StatCard {
  title: string;
  value: string | number;
  icon: string;
  trend?: string;
}
