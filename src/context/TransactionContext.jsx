import React, { createContext, useContext, useState, useEffect } from 'react';
import { getTransactions, saveTransaction } from '@/services/storage/storage';

const TransactionContext = createContext();

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error('useTransactions must be used within a TransactionProvider');
  }
  return context;
};

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Load initial transactions
    const loadedTransactions = getTransactions();
    setTransactions(loadedTransactions);
  }, []);

  const addTransaction = async (transaction) => {
    const newTransaction = await saveTransaction(transaction);
    setTransactions(prev => [...prev, newTransaction]);
    return newTransaction;
  };

  return (
    <TransactionContext.Provider value={{ transactions, addTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
};
