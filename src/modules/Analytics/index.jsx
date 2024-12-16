import React, { useMemo, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import Box from './components/Box'
import { useTransactions } from '@/context/TransactionContext'
import { calculateTotals, calculateMonthlyData, calculateExpenseCategories } from './helpers/calculationHelpers'
import LineChart from './components/Charts/LineChart'
import PieChart from './components/Charts/PieChart'

function Analytics() {
  const { transactions } = useTransactions();
  const [timeRange, setTimeRange] = useState('6m');
  
  const totals = useMemo(() => calculateTotals(transactions), [transactions]);
  const monthlyData = useMemo(() => {
    const months = parseInt(timeRange);
    return calculateMonthlyData(transactions, months);
  }, [transactions, timeRange]);
  const expenseCategories = useMemo(() => calculateExpenseCategories(transactions), [transactions]);

  const handleRangeChange = (range) => {
    setTimeRange(range);
  };

  return (
    <div className="d-flex flex-column gap-4">
      <Row>
        <Col>
          <Box category='income' title='Total Income (USD)' amount={totals.income.toLocaleString()} />
        </Col>
        <Col>
          <Box category='expense' title='Total Expenses (USD)' amount={totals.expense.toLocaleString()} />
        </Col>
        <Col>
          <Box category='balance' title='Total Balance (USD)' amount={totals.balance.toLocaleString()} />
        </Col>
      </Row>
      
      <Row className="g-4">
        <Col md={8}>
          <LineChart 
            data={monthlyData} 
            selectedRange={timeRange}
            onRangeChange={handleRangeChange}
          />
        </Col>
        <Col md={4}>
          <PieChart data={expenseCategories} />
        </Col>
      </Row>
    </div>
  )
}

export default Analytics