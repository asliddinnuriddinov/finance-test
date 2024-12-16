import React from 'react';

const Result = ( {result} ) => {
  if (!result) return null;
  const { 
    amount, 
    base_code: fromCurrency, 
    target_code: toCurrency, 
    conversion_rate: rate, 
    conversion_result: convertedAmount 
  } = result;

  return (
    <div className='mt-3'>
        <h3 style={{color: '#198754'}} className='text-center border-top pt-1'>Result</h3>
        <div className="mt-1">
            <div className="d-flex flex-column gap-3">
                <div className="text-center">
                    <span className="fs-4 fw-bold">
                    {amount} {fromCurrency} = {convertedAmount} {toCurrency}
                    </span>
                </div>
                <div className="d-flex justify-content-center align-items-center">
                    <span className="text-muted">
                    Exchange Rate: 1 {fromCurrency} = {rate} {toCurrency}
                    </span>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Result;