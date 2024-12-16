import { useState, useCallback } from 'react';
import ConversionService from '@/services/api/ConversionService';

export const useCurrencyConverter = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const convertToUSD = useCallback(async (amount, fromCurrency) => {
    if (fromCurrency === 'USD') return Number(amount);

    try {
      setIsLoading(true);
      setError(null);
      const response = await ConversionService.getSingle(fromCurrency, 'USD', amount);
      return Number((response.conversion_result).toFixed(2));
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
