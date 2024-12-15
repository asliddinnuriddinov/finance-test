import React from 'react';
import { Container } from 'react-bootstrap';
import styles from './Layout.module.css';
import Analytics from '../modules/Analytics';
import TransactionList from '../modules/TransactionList';
import TransactionForm from '../modules/TransactionForm';
import CurrencyConversion from '../modules/CurrencyConversion';

function Layout() {
  return (
    <Container fluid className="p-0">
      <div className={styles.layoutContainer}>
        <div className={styles.leftSide}>
          <div className={styles.leftTop}>
            <CurrencyConversion/>
          </div>
          <div className={styles.leftBottom}>
            <TransactionForm/>
          </div>
        </div>
        
        <div className={styles.rightSide}>
          <Analytics/>
          
          <div className={styles.bottomBox}>
            <TransactionList/>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Layout;