import React from 'react'
import styles from './App.module.css';
import Board from './Board';

export default function App() {
  return (
    <div className={styles.root}>
      <h1>2048</h1>
      <p>
        An experiment to learn Redux and some better coding practices.
      </p>
      <Board />
    </div>
  )
}
