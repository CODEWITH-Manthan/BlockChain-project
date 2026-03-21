export interface Project {
  id: string;
  name: string;
  budget: number;
  contractor: string;
  documentHash?: string;
}

export type MilestoneStatus = 'Pending' | 'Approved' | 'Paid';
export type UserRole = 'ADMIN' | 'CONTRACTOR' | 'REGULATOR' | null;

export interface Milestone {
  id: string;
  projectId: string;
  title: string;
  progress: number;
  amount: number;
  status: MilestoneStatus;
  onChainIndex?: number;
  invoiceHash?: string;
  invoiceUploaded?: boolean;
}

export interface Invoice {
  id: string;
  projectId: string;
  milestoneId: string;
  hash: string;
  amount: number;
  date: string;
  fileName?: string;
  type?: 'Invoice' | 'Receipt' | 'Certificate';
}

export interface ActionLog {
  id: string;
  message: string;
  timestamp: string;
  hash?: string;
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
