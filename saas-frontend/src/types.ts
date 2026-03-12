// src/types.ts

export interface User {
  id: number;
  email: string;
  role: string; // 'admin' or 'user'
  created_at?: string;
}

export interface Plan {
  id: number;
  name: string;
  price: number;
  duration_days: number;
  is_active?: boolean; // Matches your SQLAlchemy filter(models.Plan.is_active == True)
}

export interface Subscription {
  id: number;
  user_id: number;
  plan_id: number;
  start_date: string;
  end_date: string;
  is_active: boolean;
}

// Update this to match your SaaS Analytics/Admin logic
export interface Stats {
  total_users: number;
  active_subscriptions: number;
  total_revenue: number;
}