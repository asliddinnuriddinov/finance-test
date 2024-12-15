import React, { useMemo } from 'react'
import { Row, Col } from 'react-bootstrap'
import Box from './components/Box'
import { useTransactions } from '@/context/TransactionContext'
import { calculateTotals } from './helpers/calculationHelpers'

function Analytics() {
  const { transactions } = useTransactions();
  const totals = useMemo(() => calculateTotals(transactions), [transactions]);

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
      
      {/* Middle Boxes */}
      <Row className="g-4">
        <Col md={8}>
          <Box title='Income vs Expenses' amount='Chart Coming Soon' />
        </Col>
        <Col md={4}>
          <Box title='Categories' amount='Chart Coming Soon' />
        </Col>
      </Row>
    </div>
  )
}

export default Analytics