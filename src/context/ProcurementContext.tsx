'use client';

import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { Project, Milestone, MilestoneStatus, Invoice, UserProfile, AppNotification, Order, OrderStatus } from '../types';
import { approveOnChain, releasePaymentOnChain, syncMilestoneWithChain, addMilestoneOnChain } from '../utils/blockchain';
import { ethers } from 'ethers';

interface ProcurementContextType {
  projects: Project[];
  milestones: Milestone[];
  invoices: Invoice[];
  profile: UserProfile;
  notifications: AppNotification[];
  orders: Order[];
  addProject: (p: Project) => void;
  addMilestone: (m: Milestone) => void;
  addInvoice: (i: Invoice) => void;
  addOrder: (o: Order) => void;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  updateMilestoneStatus: (id: string, status: MilestoneStatus) => void;
  updateProfile: (p: Partial<UserProfile>) => void;
  runDemo: () => void;
}

export const ProcurementContext = createContext<ProcurementContextType | undefined>(undefined);

export const ProcurementProvider = ({ children }: { children: ReactNode }) => {
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

  // Persistence: Load from localStorage on mount
  useEffect(() => {
    const savedProjects = localStorage.getItem('nexus_projects');
    const savedMilestones = localStorage.getItem('nexus_milestones');
    const savedInvoices = localStorage.getItem('nexus_invoices');
    const savedProfile = localStorage.getItem('nexus_profile');
    const savedOrders = localStorage.getItem('nexus_orders');

    if (savedProjects) setProjects(JSON.parse(savedProjects));
    if (savedMilestones) setMilestones(JSON.parse(savedMilestones));
    if (savedInvoices) setInvoices(JSON.parse(savedInvoices));
    if (savedProfile) setProfile(JSON.parse(savedProfile));
    if (savedOrders) setOrders(JSON.parse(savedOrders));
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => { localStorage.setItem('nexus_projects', JSON.stringify(projects)); }, [projects]);
  useEffect(() => { localStorage.setItem('nexus_milestones', JSON.stringify(milestones)); }, [milestones]);
  useEffect(() => { localStorage.setItem('nexus_invoices', JSON.stringify(invoices)); }, [invoices]);
  useEffect(() => { localStorage.setItem('nexus_profile', JSON.stringify(profile)); }, [profile]);
  useEffect(() => { localStorage.setItem('nexus_orders', JSON.stringify(orders)); }, [orders]);

  const notify = (msg: string) => {
    setNotifications(prev => [{ id: `notif-${Date.now()}-${Math.random()}`, message: msg, timestamp: new Date().toISOString() }, ...prev]);
  };

  const addProject = (p: Project) => { setProjects(prev => [...prev, p]); notify(`Project created: ${p.name}`); };
  
  const addMilestone = async (m: Milestone) => {
    // Add locally first
    setMilestones(prev => [...prev, m]);
    notify(`Milestone "${m.title}" added locally.`);
    
    try {
      notify(`Syncing "${m.title}" to blockchain...`);
      // Scaling: 100,000 INR = 0.001 ETH for demo purposes
      const amountInWei = ethers.parseEther((m.amount / 100000000).toFixed(18));
      const txHash = await addMilestoneOnChain(m.title, amountInWei);
      
      // We don't know the index easily without event parsing or calling getCount, 
      // but for Sequential demo, it's milestones.length - 1
      const onChainIdx = milestones.length; 
      
      setMilestones(prev => prev.map(mil => mil.id === m.id ? { ...mil, onChainIndex: onChainIdx } : mil));
      notify(`Milestone registered on-chain! TX: ${txHash.substring(0, 10)}...`);
    } catch (err: any) {
      console.error(err);
      notify(`Chain sync failed: ${err.message || 'Transaction rejected'}`);
    }
  };

  const addOrder = (o: Order) => { setOrders(prev => [...prev, o]); notify(`Order placed: ${o.item}`); };
  const updateProfile = (p: Partial<UserProfile>) => setProfile(prev => ({ ...prev, ...p }));

  const updateOrderStatus = (id: string, status: OrderStatus) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
    notify(`Order ${id} marked as ${status}`);
  };

  const updateMilestoneStatus = async (id: string, status: MilestoneStatus) => {
    // Update local state immediately for responsive UI
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

    // Trigger REAL On-Chain Transaction
    try {
      const target = milestones.find(m => m.id === id);
      if (!target || target.onChainIndex === undefined) {
        notify("Warning: Milestone not synced to chain yet.");
        return;
      }
      const index = target.onChainIndex;

      if (status === 'Approved') {
        notify(`Requesting signature for ${milestoneTitle} Approval...`);
        const txHash = await approveOnChain(index);
        notify(`On-chain Approval Success! TX: ${txHash.substring(0, 10)}...`);
      } else if (status === 'Paid') {
        notify(`Requesting signature for ${milestoneTitle} Payment Release...`);
        const txHash = await releasePaymentOnChain(index);
        notify(`On-chain Payment Released! TX: ${txHash.substring(0, 10)}...`);
      }
    } catch (err: any) {
      console.error("Blockchain error:", err);
      notify(`Blockchain Error: ${err.message || 'Transaction rejected'}`);
    }
  };

  const addInvoice = async (i: Invoice) => {
    setInvoices(prev => [...prev, i]);
    notify(`Invoice uploaded locally for ₹${i.amount.toLocaleString('en-IN')}`);
    
    // Sync hash with chain
    try {
      const target = milestones.find(m => m.projectId === i.projectId);
      if (target && target.onChainIndex !== undefined) {
        notify(`Syncing IPFS hash ${i.hash.substring(0,8)}... to chain`);
        const txHash = await syncMilestoneWithChain(target.onChainIndex, i.hash);
        notify(`Hash synced to tamper-proof ledger! TX: ${txHash.substring(0,10)}...`);
      }
    } catch (err: any) {
      notify(`Chain sync failed: ${err.message}`);
    }
  };

  const runDemo = () => {
    const demoProjectId = `proj-${Date.now()}`;
    const demoMilestoneId = `ms-${Date.now()}`;
    
    // Step 1: Create project
    addProject({ id: demoProjectId, name: 'Hackathon Demo Project', budget: 1000000, contractor: '0xDemoContractor' });
    
    setTimeout(() => {
      // Step 2: Add milestone with a mock index for the demo
      addMilestone({ id: demoMilestoneId, projectId: demoProjectId, title: 'Demo Phase 1', progress: 10, amount: 200000, status: 'Pending', onChainIndex: 0 });
    }, 1000);

    setTimeout(() => {
      // Step 3: Fast-forward to approve
      updateMilestoneStatus(demoMilestoneId, 'Approved');
    }, 2500);

    setTimeout(() => {
      // Step 4: Add invoice
      addInvoice({ id: `inv-${Date.now()}`, projectId: demoProjectId, hash: 'QmDemoHash12345', amount: 200000, date: new Date().toISOString() });
    }, 4000);

    setTimeout(() => {
      // Step 5: Fast-forward to Pay
      updateMilestoneStatus(demoMilestoneId, 'Paid');
      alert("Demo flow completed automatically!");
    }, 5500);
  };

  return (
    <ProcurementContext.Provider value={{
      projects, milestones, invoices, profile, notifications, orders,
      addProject, addMilestone, addInvoice, addOrder, updateOrderStatus,
      updateMilestoneStatus, updateProfile, runDemo
    }}>
      {children}
    </ProcurementContext.Provider>
  );
};
