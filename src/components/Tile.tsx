import React from 'react'
import styles from './Tile.module.css';
import { ITileExt } from '../reducers/game';
import { motion } from 'framer-motion';

function Tile({ tile }: { tile: ITileExt }) {
  let fontSize = 48;
  if (tile.value >= 100) {
    fontSize = 40;
  }
  if (tile.value >= 1000) {
    fontSize = 36;
  }
  if (tile.value >= 10000) {
    fontSize = 30;
  }
  return (
    <motion.div
      className={styles.root}
      animate={{
        x: tile.x * 114,
        y: tile.y * 114,
        scale: 1,
      }}
      initial={{
        x: tile.x * 114,
        y: tile.y * 114,
        scale: 0,
      }}
      transition={{ type: 'spring', damping: 40, stiffness: 650 }}
    >
      <svg
        width="110"
        height="110"
        viewBox="0 0 110 110"
        fill="none"
        className={styles[`c${tile.value}`]}
      >
        <path
          d="M5 0H105V5H110V105H105V110H5V105H0V5H5V0Z"
          fill='var(--tile-color, #FFF)'
        />
        <path
          d="M7.5 5V2.5H102.5V5V7.5H105H107.5V102.5H105H102.5V105V107.5H7.5V105V102.5H5H2.5V7.5H5H7.5V5Z"
          stroke={tile.value === 65536 ? "white" : "black"}
          strokeOpacity="0.15"
          strokeWidth="5"
        />
        <text
          x="50%" y="50%"
          textAnchor="middle"
          alignmentBaseline="middle"
          fontSize={fontSize}
          fill="black"
          className={styles.text}
          stroke={tile.value === 65536 ? "white" : "black"}
        >
          {tile.value}
        </text>
      </svg>
    </motion.div>
  )
}

export default Tile
