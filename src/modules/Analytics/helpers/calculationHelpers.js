import { getTransactions } from "@/services/storage/storage";

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

  // Calculate balance after reduce
  totals.balance = totals.income - totals.expense;

  return totals;
};
