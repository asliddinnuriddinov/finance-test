import { useState } from 'react';
import CurrencyService from '@/services/api/CurrencyService';

export const useCurrency = () => {
  const [isLoading, setIsLoading] = useState(false);

  const getCurrencies = async () => {
    setIsLoading(true)
    try{
      const response=await CurrencyService.getAll()
      return response
    }
    catch(err){
        console.log(err);
        
    }
    finally{
      setIsLoading(false)
    }
  };


  return {
    getCurrencies,
    isLoading,
  };
};