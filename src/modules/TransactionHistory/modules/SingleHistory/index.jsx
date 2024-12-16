import React from 'react'
import { Modal, Button, ListGroup } from 'react-bootstrap'
import { useTransactions } from '@/context/TransactionContext'
import { formatDate } from '../../helpers/formatDate'
import { handleDelete } from '../../helpers/deleteTransaction'

function SingleHistory({ isOpen, closeModal, data }) {
  const { deleteTransaction } = useTransactions();

  const onDelete = () => handleDelete(deleteTransaction, data, closeModal);

  if (!data) return null;

  return (
    <Modal show={isOpen} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Transaction Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <strong>Date:</strong> {formatDate(data.date)}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Type:</strong> <span className={`text-${data.type === 'income' ? 'success' : 'danger'}`}>
              {data.type.charAt(0).toUpperCase() + data.type.slice(1)}
            </span>
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Category:</strong> {data.category.charAt(0).toUpperCase() + data.category.slice(1)}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Original Amount:</strong> {data.amount} {data.currency}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Amount in USD:</strong> ${data.amountInUSD}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Description:</strong> {data.description || 'N/A'}
          </ListGroup.Item>
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
        <Button variant="danger" onClick={onDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default SingleHistory