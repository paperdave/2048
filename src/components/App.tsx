import React from 'react'
import styles from './App.module.css';
import Board from './Board';
import Input from './Input';
import Header from './Header';

export default function App() {
  return (
    <div className={styles.root}>
      <Input />

      <h1>2048</h1>
      <p>
        An experiment to learn Redux and some better coding practices.
      </p>

      <Header />
      <Board />
    </div>
  )
}
