import { useState, useCallback } from 'react';
import CurrencyService from '@/services/api/CurrencyService';

export const useCurrencyConverter = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const convertToUSD = useCallback(async (amount, fromCurrency) => {
    if (fromCurrency === 'USD') return Number(amount);

    try {
      setIsLoading(true);
      setError(null);
      const response = await CurrencyService.getAll();
      const rates = response.conversion_rates;
      if (!rates || !rates[fromCurrency]) {
        throw new Error(`Exchange rate not found for ${fromCurrency}`);
      }
      const rate = 1 / rates[fromCurrency];
      return Number((amount * rate).toFixed(2));
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const formatAmount = useCallback((amount, currency) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  }, []);

  return {
    convertToUSD,
    formatAmount,
    isLoading,
    error
  };
};
