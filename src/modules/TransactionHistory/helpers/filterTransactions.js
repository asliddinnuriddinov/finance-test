import { isWithinInterval } from 'date-fns';

export function filterTransactions(transactions, categoryFilter, startDate, endDate) {
  let filtered = [...transactions];

  // Filter by category
  if (categoryFilter !== 'all') {
    filtered = filtered.filter(t => t.category === categoryFilter);
  }

  // Filter by date range
  if (startDate && endDate) {
    filtered = filtered.filter(t => {
      const transactionDate = new Date(t.date);
      return isWithinInterval(transactionDate, { start: startDate, end: endDate });
    });
  }

  return filtered;
}
