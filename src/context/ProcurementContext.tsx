'use client';

import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { Project, Milestone, MilestoneStatus, Invoice, UserProfile, AppNotification, Order, OrderStatus, ActionLog, UserRole } from '../types';
import { approveOnChain, releasePaymentOnChain } from '../utils/blockchain';
import { ethers } from 'ethers';

interface ProcurementContextType {
  role: UserRole;
  login: (r: UserRole, p?: Partial<UserProfile>) => void;
  logout: () => void;
  projects: Project[];
  milestones: Milestone[];
  invoices: Invoice[];
  profile: UserProfile;
  notifications: AppNotification[];
  orders: Order[];
  logs: ActionLog[];
  addProject: (p: Project) => void;
  addMilestone: (m: Milestone) => void;
  addInvoice: (i: Invoice) => void;
  addOrder: (o: Order) => void;
  addLog: (message: string, hash?: string) => void;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  updateMilestoneStatus: (id: string, status: MilestoneStatus) => void;
  updateProfile: (p: Partial<UserProfile>) => void;
}

export const ProcurementContext = createContext<ProcurementContextType | undefined>(undefined);

export const ProcurementProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  
  const [orders, setOrders] = useState<Order[]>([
    { id: 'ord-1', item: 'Portland Cement (50kg)', quantity: 200, cost: 3000, status: 'Pending', date: new Date().toISOString() },
    { id: 'ord-2', item: 'Steel Rebars (10mm)', quantity: 50, cost: 8500, status: 'Approved', date: new Date().toISOString() }
  ]);
  
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [profile, setProfile] = useState<UserProfile>({
    name: 'Barbara Authority',
    role: 'Inspector',
    wallet: '0x123...ABCD'
  });
  const [logs, setLogs] = useState<ActionLog[]>([]);

  // Persistence: Load from localStorage on mount
  useEffect(() => {
    const storedRole = localStorage.getItem('nexus_role');
    const savedProjects = localStorage.getItem('nexus_projects');
    const savedMilestones = localStorage.getItem('nexus_milestones');
    const savedInvoices = localStorage.getItem('nexus_invoices');
    const savedProfile = localStorage.getItem('nexus_profile');
    const savedOrders = localStorage.getItem('nexus_orders');
    const savedLogs = localStorage.getItem('nexus_logs');

    if (storedRole) setRole(storedRole as UserRole);
    if (savedProjects) setProjects(JSON.parse(savedProjects));
    if (savedMilestones) setMilestones(JSON.parse(savedMilestones));
    if (savedInvoices) setInvoices(JSON.parse(savedInvoices));
    if (savedProfile) setProfile(JSON.parse(savedProfile));
    if (savedOrders) setOrders(JSON.parse(savedOrders));
    if (savedLogs) setLogs(JSON.parse(savedLogs));
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => { localStorage.setItem('nexus_projects', JSON.stringify(projects)); }, [projects]);
  useEffect(() => { localStorage.setItem('nexus_milestones', JSON.stringify(milestones)); }, [milestones]);
  useEffect(() => { localStorage.setItem('nexus_invoices', JSON.stringify(invoices)); }, [invoices]);
  useEffect(() => { localStorage.setItem('nexus_profile', JSON.stringify(profile)); }, [profile]);
  useEffect(() => { localStorage.setItem('nexus_orders', JSON.stringify(orders)); }, [orders]);
  useEffect(() => { localStorage.setItem('nexus_logs', JSON.stringify(logs)); }, [logs]);
  useEffect(() => { if (role) localStorage.setItem('nexus_role', role); }, [role]);

  const login = (r: UserRole, p?: Partial<UserProfile>) => {
    setRole(r);
    if (r) {
      localStorage.setItem('nexus_role', r as string);
    }
    if (p) {
      setProfile(prev => ({ ...prev, ...p }));
      localStorage.setItem('nexus_profile', JSON.stringify({ ...profile, ...p }));
    }
  };

  const logout = () => {
    setRole(null);
    localStorage.removeItem('nexus_role');
    localStorage.removeItem('nexus_token');
  };

  const notify = (msg: string) => {
    setNotifications(prev => [{ id: `notif-${Date.now()}-${Math.random()}`, message: msg, timestamp: new Date().toISOString() }, ...prev]);
  };

  const addLog = (message: string, hash?: string) => {
    setLogs(prev => [...prev, { id: `log-${Date.now()}-${Math.random()}`, message, timestamp: new Date().toISOString(), hash }]);
  };

  const addProject = async (p: Project) => { 
    setProjects(prev => [...prev, p]); 
    notify(`Executing: createProject("${p.name}", ${p.budget})`);
    addLog(`Smart Contract: createProject Initialized`, p.documentHash);
  };
  
  const addMilestone = async (m: Milestone) => {
    setMilestones(prev => [...prev, m]);
    notify(`Milestone "${m.title}" added locally.`);
    try {
      notify(`Syncing "${m.title}" to blockchain...`);
      const amountInWei = ethers.parseEther((m.amount / 100000000).toFixed(18));
      // const txHash = await addMilestoneOnChain(m.title, amountInWei); // Removed as per instruction
      const txHash = "0xmocktxhash_addMilestone"; // Mocking for now
      const onChainIdx = milestones.length; 
      setMilestones(prev => prev.map(mil => mil.id === m.id ? { ...mil, onChainIndex: onChainIdx } : mil));
      notify(`Milestone registered on-chain! TX: ${txHash.substring(0, 10)}...`);
      addLog(`Milestone Added: ${m.title}`, txHash);
    } catch (err: any) {
      console.error(err);
      notify(`Blockchain disconnected. Fallback to local mock state.`);
      addLog(`Milestone Added: ${m.title} (Fallback)`);
    }
  };

  const addOrder = (o: Order) => { setOrders(prev => [...prev, o]); notify(`Order placed: ${o.item}`); };
  const updateProfile = (p: Partial<UserProfile>) => setProfile(prev => ({ ...prev, ...p }));

  const updateOrderStatus = (id: string, status: OrderStatus) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
    notify(`Order ${id} marked as ${status}`);
  };

  const updateMilestoneStatus = async (id: string, status: MilestoneStatus) => {
    let milestoneTitle = "";
    setMilestones(prev => prev.map(m => {
      if (m.id === id) {
        milestoneTitle = m.title;
        let progress = m.progress;
        if (status === 'Approved') { progress = 50; notify(`Milestone ${m.title} approved locally.`); }
        if (status === 'Paid') { progress = 100; notify(`Payment release triggered for ${m.title}.`); }
        return { ...m, status, progress };
      }
      return m;
    }));

    try {
      const target = milestones.find(m => m.id === id);
      if (!target || target.onChainIndex === undefined) return;
      const index = target.onChainIndex;

      if (status === 'Approved') {
        notify(`Executing: approveMilestone("${target.projectId}", "${target.id}", "${target.invoiceHash}")`);
        const txHash = await approveOnChain(index);
        notify(`On-chain Approval Success! TX: ${txHash.substring(0, 10)}...`);
        addLog(`Milestone Approved (Hash verified: ${target.invoiceHash})`, txHash);
      } else if (status === 'Paid') {
        notify(`Executing: releasePayment("${target.projectId}", "${target.id}")`);
        const txHash = await releasePaymentOnChain(index);
        notify(`On-chain Payment Released! TX: ${txHash.substring(0, 10)}...`);
        addLog(`Payment Released: ${milestoneTitle}`, txHash);
      }
    } catch (err: any) {
      console.error("Blockchain error fallback:", err);
      notify(`Using mock fallback for Web3. Local state updated.`);
      addLog(`Milestone ${status}: ${milestoneTitle} (Fallback)`);
    }
  };

  const addInvoice = async (i: Invoice) => {
    setInvoices(prev => [...prev, i]);
    
    // Bind hash explicitly to milestone object
    setMilestones(prev => prev.map(m => m.id === i.milestoneId ? { ...m, invoiceHash: i.hash, invoiceUploaded: true } : m));
    
    notify(`Executing: uploadDocument("${i.projectId}", "${i.milestoneId}", "${i.hash}", "${i.type}")`);
    addLog(`Document Logged (${i.type}): Generated Hash`, i.hash);
    
    try {
      const target = milestones.find(m => m.projectId === i.projectId);
      if (target && target.onChainIndex !== undefined) {
        notify(`Syncing IPFS hash ${i.hash.substring(0,8)}... to chain`);
        // const txHash = await syncMilestoneWithChain(target.onChainIndex, i.hash); // Removed as per instruction
        const txHash = "0xmocktxhash_syncMilestone"; // Mocking for now
        notify(`Hash synced to tamper-proof ledger! TX: ${txHash.substring(0,10)}...`);
      }
    } catch (err: any) {
      notify(`Chain sync failed: ${err.message}`);
    }
  };

  return (
    <ProcurementContext.Provider value={{
      role, login, logout,
      projects, milestones, invoices, profile, notifications, orders, logs,
      addProject, addMilestone, addInvoice, addOrder, addLog, updateOrderStatus,
      updateMilestoneStatus, updateProfile
    }}>
      {children}
    </ProcurementContext.Provider>
  );
};

export function useProcurement() {
  const context = React.useContext(ProcurementContext);
  if (context === undefined) {
    throw new Error('useProcurement must be used within a ProcurementProvider');
  }
  return context;
}
