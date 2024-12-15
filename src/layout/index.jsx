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
          <div className={styles.topBoxes}>
            <div className={styles.topBox}></div>
            <div className={styles.topBox}></div>
            <div className={styles.topBox}></div>
          </div>
          
          <div className={styles.middleBoxes}>
            <div className={`${styles.middleBox} ${styles.middleLeft}`}></div>
            <div className={`${styles.middleBox} ${styles.middleRight}`}></div>
          </div>
          
          <div className={styles.bottomBox}>
            <TransactionList/>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Layout;