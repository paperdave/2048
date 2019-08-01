import React, { useRef, useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { IStore } from '../store';
import { start } from '../actions';
import styles from './Header.module.css';
import { motion } from 'framer-motion';

type EventHandler = () => void;

type ScoreGainedInfo = { turn: number, score: number };

function Header({ turns, score, start, scoreGained, highScore, highestTile }: ({ score: number, highScore: number, highestTile: number, scoreGained: number | null, turns: number, start: EventHandler })) {
  const ref = useRef();
  const elem = ref.current as any as SVGTextElement;

  const [scoreGainedPopups, setScoreGainedPopups] = useState<ScoreGainedInfo[]>([]);
  useEffect(() => {
    if (scoreGained) {
      setScoreGainedPopups((array) => array.concat({ score: scoreGained, turn: turns } as ScoreGainedInfo));
      setTimeout(() => {
      setScoreGainedPopups((array) => array.filter((item) => item.turn !== turns));
      }, 1000);
    }
  }, [turns, scoreGained]);

  return (
    <svg className={styles.root} width="512" height="96" viewBox="0 0 512 96" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 0H502V10H512V96H0V10H10V0Z" fill="#A3A3A3" />
      <g>
        <path d="M296 10H492V20H502V66H492V76H296V66H286V20H296V10Z" fill="#252525" />
        <text
          x="395px"
          y="35px"
          fill="white"
          font-size="20px"
          textAnchor="middle"
          alignmentBaseline="middle"
          fontWeight='bold'
          ref={ref as any}
        >Score: {score}</text>
        <text
          x="395px"
          y="56px"
          fill="#676767"
          font-size="16px"
          textAnchor="middle"
          alignmentBaseline="middle"
          fontWeight='bold'
        >Record: {highScore} ({ highestTile } Tile)</text>
        {
          scoreGainedPopups.map((item) => {
            return <text
              key={item.turn}
              x={390 + (elem ? (elem.textContent as any).length * 6 : 0) + 'px'}
              y="35px"
              className={styles.scoreGained}
              fill="cornflowerblue"
              font-size="20px"
              textAnchor="left"
              alignmentBaseline="middle"
              fontWeight='bold'
            >+{item.score}</text>
          })
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
    highScore: state.game.highScore,
    highestTile: state.game.highestTile,
    scoreGained: state.game.scoreGained,
    turns: state.game.turns,
  }),
  { start }
)(Header);
