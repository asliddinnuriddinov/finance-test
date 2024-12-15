import { useState } from 'react';
import ConversionService from '@/services/api/ConversionService';

export const useConversion = () => {
  const [isLoading, setIsLoading] = useState(false);

  const convert = async (from, to, amount) => {
    setIsLoading(true)
    try{
      const response=await ConversionService.getSingle(from, to, amount)
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
    convert,
    isLoading,
  };
};