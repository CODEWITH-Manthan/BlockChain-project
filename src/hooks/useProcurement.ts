'use client';
import { useContext } from 'react';
import { ProcurementContext } from '../context/ProcurementContext';

export const useProcurement = () => {
  const context = useContext(ProcurementContext);
  if (context === undefined) {
    throw new Error('useProcurement must be used within a ProcurementProvider');
  }
  return context;
};
