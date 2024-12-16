import { getTransactions } from "@/services/storage/storage";

export const calculateTotals = () => {
  const transactions = getTransactions();
  
  const newTotals = transactions.reduce((acc, transaction) => {
    const amount = parseFloat(transaction.amount);
    if (transaction.type === 'income') {
      acc.income += amount;
    } else if (transaction.type === 'expense') {
      acc.expense += amount;
    }
    return acc;
  }, { income: 0, expense: 0 });

  newTotals.balance = newTotals.income - newTotals.expense;
  return newTotals;
};
