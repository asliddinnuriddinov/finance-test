import React, { createContext, useContext, useState, useEffect } from 'react';
import { getTransactions, saveTransaction, TRANSACTIONS_KEY } from '@/services/storage/storage';

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

  const deleteTransaction = async (id) => {
    try {
      const transactions = getTransactions();
      const filteredTransactions = transactions.filter(t => t.id !== id);
      localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(filteredTransactions));
      setTransactions(prev => prev.filter(t => t.id !== id));
      return true;
    } catch (error) {
      console.error('Error deleting transaction:', error);
      return false;
    }
  };

  return (
    <TransactionContext.Provider value={{ transactions, addTransaction, deleteTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
};
