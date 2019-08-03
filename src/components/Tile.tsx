import React, { useState, useEffect } from 'react'
import styles from '../css/Tile.module.css';
import { ITileExt } from '../reducers/game';
import { motion } from 'framer-motion';
import clsx from 'clsx';

function Tile({ tile }: { tile: ITileExt }) {
  const [tileValue, setTileValue] = useState(tile.value);
  const [bounce, setBounce] = useState(false);

  useEffect(() => {
    if (tileValue !== tile.value) {
      const x = setInterval(() => {
        setTileValue(tile.value);
        setBounce(true);
      }, 100);
      return () => clearInterval(x);
    }
  }, [tile.value, tileValue]);
  useEffect(() => {
    if (bounce) {
      const x = setInterval(() => {
        setBounce(false);
      }, 50);
      return () => clearInterval(x);
    }
  }, [bounce]);

  let fontSize = 48;
  if (tileValue >= 100) {
    fontSize = 40;
  }
  if (tileValue >= 1000) {
    fontSize = 36;
  }
  if (tileValue >= 10000) {
    fontSize = 30;
  }
  return (
    <motion.svg
      width="110"
      height="110"
      viewBox="0 0 110 110"
      fill="none"
      className={clsx(styles.root, styles[`c${tileValue}`])}
      animate={{
        x: tile.x * 114 + 30,
        y: tile.y * 114 + 30,
      }}
      initial={{
        x: tile.x * 114 + 30,
        y: tile.y * 114 + 30,
      }}
      transition={{ type: 'spring', damping: 40, stiffness: 650 }}
      style={{
        zIndex: tile.removed ? 0 : 2,
      }}
    >
      <motion.g
        animate={{
          scale: bounce ? 1.12 : 1,
        }}
        initial={{
          scale: 0,
        }}
        transition={{ type: 'spring', damping: 60, stiffness: 500 }}
      >
        <path
          d="M5 0H105V5H110V105H105V110H5V105H0V5H5V0Z"
          fill='var(--tile-color, #FFF)'
        />
        <path
          d="M7.5 5V2.5H102.5V5V7.5H105H107.5V102.5H105H102.5V105V107.5H7.5V105V102.5H5H2.5V7.5H5H7.5V5Z"
          stroke={tileValue === 65536 ? "white" : "black"}
          strokeOpacity="0.15"
          strokeWidth="5"
        />
        <text
          x={55} y={55 + fontSize / 2 - 5}
          textAnchor="middle"
          fontSize={fontSize}
          fill="black"
          className={styles.text}
          stroke={tileValue === 65536 ? "white" : "black"}
        >
          {tileValue}
        </text>
      </motion.g>
    </motion.svg>
  )
}

export default Tile
