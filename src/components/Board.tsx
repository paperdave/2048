import React from 'react'
import styles from './Board.module.css';
import { connect } from 'react-redux';
import { IBoard, ITileExt } from '../reducers/game';
import { IStore } from '../store';
import Tile from './Tile';

function Board({ board, removedTiles, lose }: { board: IBoard, removedTiles: ITileExt[], lose: boolean }) {
  return (
    <div className={styles.root}>
      {/* The Board */}
      <svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 0H502V10H512V502H502V512H10V502H0V10H10V0Z" fill="#252525" />
        <rect x="30" y="30" width="452" height="452" fill="#555555" />
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
      <div className={styles.tileContainer}>
        {
          (board
            .flatMap((row, y) => row.map((tile, x) => (tile && { ...tile, x, y })))
            .filter(((tile) => tile !== null)) as ITileExt[])
            .concat(removedTiles)
            .sort((tile1, tile2) => (tile1.id > tile2.id) as any)
            .map((tile) => {
              if(!tile) {
                return null;
              }
              return <Tile
                key={tile.id}
                tile={tile}
              />;
            })
        }
        {JSON.stringify(lose)}

      </div>
    </div>
  )
}

export default connect(
  (state: IStore) => ({
    board: state.game.board,
    removedTiles: state.game.removedTiles,
    lose: state.game.lose,
  }),
  { },
)(Board);
