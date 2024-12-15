import { z } from 'zod';

export const transactionSchema = z.object({
  type: z.enum(['income', 'expense'], {
    required_error: 'Please select a transaction type',
  }),
  amount: z.string()
    .min(1, 'Amount is required')
    .regex(/^\d*\.?\d*$/, 'Must be a valid number')
    .refine((val) => parseFloat(val) > 0, 'Amount must be greater than 0'),
  currency: z.string().min(1, 'Please select a currency'),
  category: z.string().min(1, 'Please select a category'),
  date: z.string().min(1, 'Date is required'),
  description: z.string().optional(),
});
