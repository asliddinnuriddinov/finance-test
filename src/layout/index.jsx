import React from 'react';
import { Container } from 'react-bootstrap';
import styles from './Layout.module.css';

function Layout() {
  return (
    <Container fluid className="p-0">
      <div className={styles.layoutContainer}>
        <div className={styles.leftSide}>
          <div className={styles.leftTop}></div>
          <div className={styles.leftBottom}></div>
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
          
          <div className={styles.bottomBox}></div>
        </div>
      </div>
    </Container>
  );
}

export default Layout;