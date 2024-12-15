import { z } from 'zod';

const schema = z.object({
    amount: z.string()
      .min(1, 'Amount is required')
      .regex(/^\d*\.?\d*$/, 'Must be a valid number')
      .refine((val) => parseFloat(val) > 0, 'Amount must be greater than 0'),
    fromCurrency: z.string().min(1, 'From currency is required'),
    toCurrency: z.string().min(1, 'To currency is required')
  }).refine(
    data => data.fromCurrency !== data.toCurrency,
    {
      message: "From and To currencies must be different",
      path: ["toCurrency"]
    }
  );
  
export default schema;