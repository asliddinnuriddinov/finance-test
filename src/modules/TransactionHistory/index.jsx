import { useState, useEffect } from 'react'
import { Card, Col, Form, Row } from 'react-bootstrap'
import DatePicker from 'react-datepicker';
import { TRANSACTION_CATEGORIES } from './constants';
import { filterTransactions } from './helpers/filterTransactions';
import { Table } from '@/ui';
import { useTransactions } from '@/context/TransactionContext';
import SingleHistory from './modules/SingleHistory';

function TransactionHistory() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { transactions: storedTransactions } = useTransactions();

  useEffect(() => {
    setTransactions(storedTransactions);
    setFilteredTransactions(storedTransactions);
  }, [storedTransactions]);

  useEffect(() => {
    let filtered = filterTransactions(transactions, categoryFilter, startDate, endDate);
    setFilteredTransactions(filtered);
  }, [categoryFilter, startDate, endDate, transactions]);

  const handleRowClick = (transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTransaction(null);
  };

  return (
    <Card className="mb-4">
      <Card.Header>
        <h4 className="mb-3">Transactions History</h4>
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

      <Card.Body style={{ overflowY: 'auto', maxHeight: '17.7vw' }}>
        <Table 
          headings={['Date', 'Type', 'Category', 'Amount (Original)', 'Amount (USD)', 'Description']} 
          data={filteredTransactions} 
          dataToShow={['date', 'type', 'category', 'amount', 'amountInUSD', 'description']}
          onRowClick={handleRowClick}
        />
      </Card.Body>

      <SingleHistory 
        isOpen={isModalOpen}
        closeModal={handleCloseModal}
        data={selectedTransaction}
      />
    </Card>
  )
}

export default TransactionHistory