import React from 'react'
import { Card } from 'react-bootstrap'

const Box = ({ category, title, amount, className = '' }) => {
  return (
    <Card className={`h-100 shadow-sm ${className}`}>
      <Card.Body className="d-flex flex-column justify-content-between">
        <Card.Title className="text-muted">{title}</Card.Title>
        <Card.Text style={{ color: category === 'balance' && amount > 0 ? 'lightgreen' : category === 'balance' && amount < 0 ? 'red' : category === 'income' ? 'lightgreen' : 'red' }} className="fs-3 fw-bold mb-0">${amount}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Box