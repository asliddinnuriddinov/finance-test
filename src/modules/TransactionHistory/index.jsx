import { useState, useEffect } from 'react'
import { Card, Col, Form, Row } from 'react-bootstrap'
import DatePicker from 'react-datepicker';
import { TRANSACTION_CATEGORIES } from './constants';
import { filterTransactions } from './helpers/filterTransactions';
import CustomTable from '@/ui/Table';

function TransactionHistory() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    const storedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
    setTransactions(storedTransactions);
    setFilteredTransactions(storedTransactions);
  }, []);

  useEffect(() => {
    let filtered = filterTransactions(transactions, categoryFilter, startDate, endDate);
    setFilteredTransactions(filtered);
  }, [categoryFilter, startDate, endDate, transactions]);

  return (
    <Card className="mb-4">
      <Card.Header>
        <h5 className="mb-3">Transactions</h5>
        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Category Filter</Form.Label>
              <Form.Select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                {TRANSACTION_CATEGORIES.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Start Date</Form.Label>
              <DatePicker
                selected={startDate}
                onChange={date => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                className="form-control"
                placeholderText="Select start date"
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>End Date</Form.Label>
              <DatePicker
                selected={endDate}
                onChange={date => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                className="form-control"
                placeholderText="Select end date"
              />
            </Form.Group>
          </Col>
        </Row>
      </Card.Header>

      <Card.Body>
        <CustomTable headings={['Date', 'Type', 'Category', 'Amount (Original)', 'Amount (USD)', 'Description']} data={filteredTransactions} dataToShow={['date', 'type', 'category', 'amount', 'amountInUSD', 'description']} />
      </Card.Body>
    </Card>
  )
}

export default TransactionHistory