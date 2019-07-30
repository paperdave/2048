import React from 'react'
import styles from './Board.module.css';
import { connect } from 'react-redux';

function Board({ board }) {
  return (
    <div className={styles.root}>
      {/* The Board */}
      <svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="512" height="512" fill="#252525" />
        <rect width="10" height="10" fill="#3D3D3D" />
        <rect y="502" width="10" height="10" fill="#3D3D3D" />
        <rect x="502" y="502" width="10" height="10" fill="#3D3D3D" />
        <rect x="30" y="30" width="452" height="452" fill="#555555" />
        <rect x="502" width="10" height="10" fill="#3D3D3D" />
        <rect x="472" y="472" width="10" height="10" fill="#252525" />
        <rect x="472" y="30" width="10" height="10" fill="#252525" />
        <rect x="30" y="472" width="10" height="10" fill="#252525" />
        <rect x="30" y="30" width="10" height="10" fill="#252525" />
        <rect x="140" y="30" width="4" height="452" fill="#707070" />
        <rect x="254" y="30" width="4" height="452" fill="#707070" />
        <rect x="368" y="30" width="4" height="452" fill="#707070" />
        <rect x="482" y="140" width="4" height="452" transform="rotate(90 482 140)" fill="#707070" />
        <rect x="482" y="254" width="4" height="452" transform="rotate(90 482 254)" fill="#707070" />
        <rect x="482" y="368" width="4" height="452" transform="rotate(90 482 368)" fill="#707070" />
      </svg>

      {/* The Tiles */}
      <div>
        {
          JSON.stringify(board.flatMap(row => row.map(tile => tile)))
        }
      </div>

    </div>
  )
}

export default connect(
  state => ({
    board: state.game.board,
  }),
  { },
)(Board);
