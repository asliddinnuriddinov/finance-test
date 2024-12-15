import React, { useState, useEffect } from 'react';
import { Card, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import Select from '@/ui/Select';
import Input from '@/ui/Input';
import Button from '@/ui/Button';
import TextArea from '@/ui/TextArea';
import { transactionSchema } from './schema';
import { 
  TRANSACTION_TYPES, 
  CURRENCIES, 
  EXPENSE_CATEGORIES,
  INCOME_CATEGORIES 
} from './constants';
import { formatDate } from './helpers/dateHelpers';
import { saveTransaction } from './helpers/storageHelpers';

const TransactionForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [categories, setCategories] = useState(EXPENSE_CATEGORIES);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      type: 'expense',
      amount: '',
      currency: 'USD',
      category: '',
      date: formatDate(new Date()),
      description: ''
    }
  });

  const transactionType = watch('type');

  useEffect(() => {
    // Update categories when transaction type changes
    const newCategories = transactionType === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
    setCategories(newCategories);
    // Reset category when type changes
    setValue('category', '');
  }, [transactionType, setValue]);

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      await saveTransaction(data);
      reset();
      setSelectedDate(new Date());
    } catch (error) {
      console.error('Error saving transaction:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const formattedDate = formatDate(date);
    register('date').onChange({ target: { value: formattedDate } });
  };

  return (
    <Card className="shadow-sm overflow-scroll">
      <Card.Header className="bg-white">
        <h5 className="mb-0">Add New Transaction</h5>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Select
            label="Type"
            {...register('type')}
            options={TRANSACTION_TYPES}
            className="mb-3"
            error={errors.type?.message}
            required
            placeholder="Select transaction type"
          />

          <Input
            label="Amount"
            type="text"
            placeholder="Enter amount"
            className="mb-3"
            error={errors.amount?.message}
            required
            {...register('amount')}
          />

          <Select
            label="Currency"
            {...register('currency')}
            options={CURRENCIES}
            className="mb-3"
            error={errors.currency?.message}
            required
            placeholder="Select currency"
          />

          <Select
            label="Category"
            {...register('category')}
            options={categories}
            className="mb-3"
            error={errors.category?.message}
            required
            placeholder={`Select ${transactionType} category`}
          />

          <Form.Group className="mb-3">
            <Form.Label>
              Date<span className="text-danger ms-1">*</span>
            </Form.Label>
            <br />
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              className="form-control"
              dateFormat="MMMM dd, yyyy"
              placeholderText="Select date"
            />
            {errors.date && (
              <div className="invalid-feedback d-block" style={{marginLeft: '0.55rem'}}>
                {errors.date.message}
              </div>
            )}
          </Form.Group>

          <TextArea
            label="Description"
            placeholder="Enter description"
            className="mb-3"
            error={errors.description?.message}
            {...register('description')}
          />

          <Button 
            type="submit"
            block
            loading={isLoading}
          >
            Add Transaction
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default TransactionForm;