import { getTransactions } from "@/services/storage/storage";
import { format, subMonths, startOfMonth } from 'date-fns';

export const calculateTotals = (transactions) => {
  const totals = transactions.reduce((acc, transaction) => {
    const amount = parseFloat(transaction.amount);
    if (transaction.type === 'income') {
      acc.income += amount;
    } else if (transaction.type === 'expense') {
      acc.expense += amount;
    }
    return acc;
  }, { income: 0, expense: 0, balance: 0 });

  totals.balance = totals.income - totals.expense;
  return totals;
};

export const calculateMonthlyData = (transactions) => {
  const now = new Date();
  const monthlyData = {};
  
  // Initialize last 6 months
  for (let i = 0; i < 6; i++) {
    const month = format(subMonths(now, i), 'MMM yyyy');
    monthlyData[month] = { income: 0, expense: 0 };
  }

  // Fill in the data
  transactions.forEach(transaction => {
    const month = format(new Date(transaction.date), 'MMM yyyy');
    if (monthlyData[month]) {
      const amount = parseFloat(transaction.amount);
      if (transaction.type === 'income') {
        monthlyData[month].income += amount;
      } else {
        monthlyData[month].expense += amount;
      }
    }
  });

  // Convert to array and reverse for chart display
  return Object.entries(monthlyData)
    .reverse()
    .map(([month, data]) => ({
      month,
      income: data.income,
      expense: data.expense
    }));
};

export const calculateExpenseCategories = (transactions) => {
  return transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, transaction) => {
      const amount = parseFloat(transaction.amount);
      acc[transaction.category] = (acc[transaction.category] || 0) + amount;
      return acc;
    }, {});
};
