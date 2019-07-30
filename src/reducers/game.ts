import { spawnNewTile, ActionObject, Type, Direction } from '../actions';

export type ITile = { value: number, id: string } | null;
export type ITileExt = ITile & { x: number, y: number };

export type IBoard = ITile[][];

export interface IGame {
  board: IBoard,
  score: number,
  scoreGained: number | null,
  turns: number,
}

/** Generates an Identifier */
function id() {
  return Math.random().toString().substr(2);
}

export default function reduce(state: IGame, action: ActionObject): IGame {
  switch (action.type) {
    case state === undefined ? action.type : null:
    case Type.START: {
      let newState: IGame = {
        board: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
        score: 0,
        scoreGained: null,
        turns: 0,
      };

      // Spawn Two Tiles
      newState = reduce(newState, spawnNewTile());
      newState = reduce(newState, spawnNewTile());

      return newState;
    }
    case Type.SPAWN_TILE: {
      if (!state.board.find(x => x.find(x => x === null))) {
        let board = state.board.map(x => x.concat()).concat();
        let x, y;

        do {
          x = Math.floor(Math.random() * 4);
          y = Math.floor(Math.random() * 4);
        } while (board[x][y] !== null);

        board[x][y] = { id: id(), value: Math.random() < 0.9 ? 2 : 4 };

        return {
          ...state,
          board,
        };
      }
      return state;
    }
    case Type.MOVE: {
      let board = state.board.map(x => x.concat()).concat();

      const flipX = action.dir === Direction.RIGHT || action.dir === Direction.DOWN;
      const rotate90 = action.dir === Direction.DOWN || action.dir === Direction.UP;

      let boardMoved = false;
      let scoreGained = 0;

      for (let i = 0; i < 4; i++) {
        for (let j = flipX ? 3 : 0; flipX ? j >= 0 : j < 4; j += flipX ? -1 : 1) {
          let tile = rotate90 ? board[j][i] : board[i][j];
          if (tile) {
            let value = tile.value;
            let targetJ = j;
            while (
              !(rotate90
                ? board[flipX ? targetJ + 1 : targetJ - 1]
                  && board[flipX ? targetJ + 1 : targetJ - 1][i]
                : board[i][flipX ? targetJ + 1 : targetJ - 1]
              ) && (flipX ? targetJ !== 3 : targetJ !== 0)
            ) {
              targetJ += flipX ? 1 : -1;
            }
            if (rotate90) {
              const targetTile = board[flipX ? targetJ + 1 : targetJ - 1] && board[flipX ? targetJ + 1 : targetJ - 1][i];
              if (targetTile && targetTile.value === value) {
                value *= 2;
                targetJ += flipX ? 1 : -1;
                scoreGained += value;
              }
              if (j !== targetJ) {
                board[j][i] = null;
                board[targetJ][i] = { id: tile.id, value };;
                boardMoved = true;
              }
            } else {
              const targetTile = board[i][flipX ? targetJ + 1 : targetJ - 1];
              if (targetTile && targetTile.value === tile.value) {
                value *= 2;
                targetJ += flipX ? 1 : -1;
                scoreGained += value;
              }
              if (j !== targetJ) {
                board[i][j] = null;
                board[i][targetJ] = { id: tile.id, value };
                boardMoved = true;
              }
            }
          }
        }
      }

      if (boardMoved) {
        let newState: IGame = {
          ...state,
          score: state.score + scoreGained,
          turns: state.turns + 1,
          board,
          scoreGained,
        };

        newState = reduce(newState, spawnNewTile());

        return newState;
      }

      return state;
    }
    default: {
      return state;
    }
  }
}
