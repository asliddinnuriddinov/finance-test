const TRANSACTIONS_KEY = 'transactions';

export const saveTransaction = (transaction) => {
  const transactions = getTransactions();
  transactions.push({
    ...transaction,
    id: Date.now().toString(),
    createdAt: new Date().toISOString()
  });
  localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions));
  return transaction;
};

export const getTransactions = () => {
  const transactions = localStorage.getItem(TRANSACTIONS_KEY);
  return transactions ? JSON.parse(transactions) : [];
};
