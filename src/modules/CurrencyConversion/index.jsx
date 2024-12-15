import React, { useState } from 'react';
import { Card, Form } from 'react-bootstrap';
import { useConversion } from '@/hooks/useConversion';
import Select from '@/ui/Select';
import Input from '@/ui/Input';
import Button from '@/ui/Button';
import Result from './components/Result';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import schema from './schema';

const currencyOptions = [
  { value: 'USD', label: 'USD' },
  { value: 'EUR', label: 'EUR' },
  { value: 'UZS', label: 'UZS' }
];

const CurrencyConversion = () => {
  const { convert, isLoading } = useConversion();
  const [conversionResult, setConversionResult] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      amount: '',
      fromCurrency: 'USD',
      toCurrency: 'UZS'
    }
  });

  const onSubmit = async (data) => {
    let result = await convert(data.fromCurrency, data.toCurrency, data.amount);
    if (result) result.amount = data.amount;
    setConversionResult(result);
  };

  return (
    <Card className="h-100 shadow-sm overflow-scroll">
      <Card.Header className="bg-white">
        <h5 className="mb-0">Currency Converter</h5>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Amount"
            type="text"
            placeholder="Enter amount"
            className="mb-3"
            error={errors.amount?.message}
            required
            {...register('amount')}
          />

          <div className="d-flex gap-3 mb-3">
            <Select
              label="From"
              {...register('fromCurrency')}
              options={currencyOptions}
              className="flex-grow-1"
              error={errors.fromCurrency?.message}
              required
            />

            <Select
              label="To"
              {...register('toCurrency')}
              options={currencyOptions}
              className="flex-grow-1"
              error={errors.toCurrency?.message}
              required
            />
          </div>

          <Button 
            type="submit"
            block
            loading={isLoading}
          >
            Convert
          </Button>
        </Form>

        <Result result={conversionResult} />
      </Card.Body>
    </Card>
  );
};

export default CurrencyConversion;