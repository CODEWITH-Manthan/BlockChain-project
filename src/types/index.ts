export interface Project {
  id: string;
  name: string;
  budget: number;
  contractor: string;
}

export type MilestoneStatus = 'Pending' | 'Approved' | 'Paid';

export interface Milestone {
  id: string;
  projectId: string;
  title: string;
  progress: number;
  amount: number;
  status: MilestoneStatus;
  onChainIndex?: number;
}

export interface Invoice {
  id: string;
  projectId: string;
  hash: string;
  amount: number;
  date: string;
}

export interface UserProfile {
  name: string;
  role: string;
  wallet: string;
}

export interface AppNotification {
  id: string;
  message: string;
  timestamp: string;
}

export type OrderStatus = 'Pending' | 'Approved' | 'Rejected';

export interface Order {
  id: string;
  item: string;
  quantity: number;
  cost: number;
  status: OrderStatus;
  date: string;
}
