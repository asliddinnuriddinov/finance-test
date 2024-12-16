import React, { memo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Card, ButtonGroup, Button } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const LineChart = ({ data, onRangeChange, selectedRange = '6m' }) => {
  const chartData = {
    labels: data.map(item => item.month),
    datasets: [
      {
        label: 'Income',
        data: data.map(item => item.income),
        borderColor: 'rgba(40, 167, 69, 1)',
        backgroundColor: 'rgba(40, 167, 69, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 6,
        pointHoverRadius: 8,
        pointBackgroundColor: 'rgba(40, 167, 69, 1)',
        pointBorderColor: 'white',
        pointBorderWidth: 2,
      },
      {
        label: 'Expenses',
        data: data.map(item => item.expense),
        borderColor: 'rgba(220, 53, 69, 1)',
        backgroundColor: 'rgba(220, 53, 69, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 6,
        pointHoverRadius: 8,
        pointBackgroundColor: 'rgba(220, 53, 69, 1)',
        pointBorderColor: 'white',
        pointBorderWidth: 2,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          padding: 20,
          font: {
            size: 14
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: {
          size: 14
        },
        bodyFont: {
          size: 13
        },
        displayColors: true,
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || '';
            const value = context.parsed.y;
            return `${label}: $${value.toLocaleString()}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        },
        ticks: {
          callback: (value) => `$${value.toLocaleString()}`
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    },
    animation: {
      duration: 2000,
      easing: 'easeInOutQuart',
      delay: (context) => context.dataIndex * 100
    },
    transitions: {
      active: {
        animation: {
          duration: 400
        }
      }
    },
    interaction: {
      mode: 'index',
      intersect: false
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="h-100 shadow-sm">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Card.Title className="mb-0">Income vs Expenses</Card.Title>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <ButtonGroup size="sm">
                {[
                  { label: '3M', value: '3m' },
                  { label: '6M', value: '6m' },
                  { label: '12M', value: '12m' }
                ].map((range) => (
                  <Button
                    key={range.value}
                    variant={selectedRange === range.value ? 'primary' : 'outline-primary'}
                    onClick={() => onRangeChange(range.value)}
                  >
                    {range.label}
                  </Button>
                ))}
              </ButtonGroup>
            </motion.div>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedRange}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              style={{ height: '300px' }}
            >
              <Line data={chartData} options={options} />
            </motion.div>
          </AnimatePresence>
        </Card.Body>
      </Card>
    </motion.div>
  );
};

export default memo(LineChart)