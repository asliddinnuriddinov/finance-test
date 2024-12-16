import { useState } from 'react';
import ConversionService from '@/services/api/ConversionService';
import { toast } from 'react-toastify';

export const useConversion = () => {
  const [isLoading, setIsLoading] = useState(false);

  const convert = async (from, to, amount) => {
    setIsLoading(true)
    try{
      const response=await ConversionService.getSingle(from, to, amount)
      toast.success('Conversion successful');
      return response
    }
    catch(err){
        console.log(err);
        toast.error('Conversion failed, please try again');
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