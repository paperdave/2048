import React, { useRef } from 'react'
import { connect } from 'react-redux';
import { IStore } from '../store';
import { start } from '../actions';
import styles from './Header.module.css';
import { motion } from 'framer-motion';

type EventHandler = () => void;

function Header({ turns, score, start, scoreGained }: ({ score: number, scoreGained: number | null, turns: number, start: EventHandler })) {
  const ref = useRef();
  const elem = ref.current as any as SVGTextElement;

  return (
    <svg className={styles.root} width="512" height="96" viewBox="0 0 512 96" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 0H502V10H512V96H0V10H10V0Z" fill="#A3A3A3" />
      <g>
        <path d="M296 10H492V20H502V66H492V76H296V66H286V20H296V10Z" fill="#252525" />
        <text
          x="395px"
          y="43px"
          fill="white"
          font-size="20px"
          textAnchor="middle"
          alignmentBaseline="middle"
          fontWeight='bold'
          ref={ref as any}
        >Score: {score}</text>
        {
          scoreGained && <text
            key={turns}
            x={390 + (elem ? (elem.textContent as any).length * 6 : 0) + 'px'}
            y="43px"
            className={styles.scoreGained}
            fill="cornflowerblue"
            font-size="20px"
            textAnchor="left"
            alignmentBaseline="middle"
            fontWeight='bold'
          >+{scoreGained}</text>
        }
      </g>
      <motion.g
        onClick={start}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.95 }}
      >
        <path d="M20 10H164V20H174V66H164V76H20V66H10V20H20V10Z" fill="#252525" />
        <text
          x='90px'
          y='43px'
          fill='white'
          fontSize='20px'
          textAnchor="middle"
          alignmentBaseline="middle"
          fontWeight='bold'
        >RESTART</text>
      </motion.g>
    </svg>
  )
}

export default connect(
  (state: IStore) => ({
    score: state.game.score,
    scoreGained: state.game.scoreGained,
    turns: state.game.turns,
  }),
  { start }
)(Header);
