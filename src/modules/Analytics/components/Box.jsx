import React from 'react'
import { Card } from 'react-bootstrap'
import { motion } from 'framer-motion'

const Box = ({ category, title, amount, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.04 }}
    >
      <Card className={`h-100 shadow-sm ${className}`}>
        <Card.Body className="d-flex flex-column justify-content-between">
          <motion.h5 
            className="text-muted mb-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {title}
          </motion.h5>
          <motion.div 
            style={{ 
              color: category === 'balance' && amount > 0 ? '#198754' : 
                     category === 'balance' && amount < 0 ? '#dc3545' : 
                     category === 'income' ? '#198754' : '#dc3545'
            }}
            className="fs-3 fw-bold mb-0"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.3
            }}
          >
            ${amount}
          </motion.div>
        </Card.Body>
      </Card>
    </motion.div>
  )
}

export default Box