import { spawnNewTile, ActionObject, Type, Direction } from '../actions';
import { randomInt, chance } from '@reverse/random';

export type ITile = { value: number, id: string, removed?: boolean } | null;
export type ITileExt = ITile & { x: number, y: number };

export type IBoard = ITile[][];

export interface IGame {
  board: IBoard,
  score: number,
  highScore: number,
  highestTile: number,
  highestTileThisGame: number,
  scoreGained: number | null,
  turns: number,
  removedTiles: ITileExt[],
  lose: boolean,
}

/** Generates an Identifier */
function id() {
  return Math.random().toString().substr(2);
}

function loseCheck(board: IBoard) {
  function getTileValue(i: number, j: number) {
    const tile = board[i] && board[i][j];
    if (tile) return tile.value;
    return 0;
  }

  return !board.some((row, i) => row.some((tile, j) => {
    if (!tile) return true;
    if (tile.value === getTileValue(i + 1, j)) return true;
    if (tile.value === getTileValue(i - 1, j)) return true;
    if (tile.value === getTileValue(i, j + 1)) return true;
    if (tile.value === getTileValue(i, j - 1)) return true;
    return false;
  }));
}

export default function reduce(state: IGame, action: ActionObject): IGame {
  switch (action.type) {
    case state == null ? action.type : null:
    case Type.START: {
      let newState: IGame = {
        board: [
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
          [null, null, null, null],
        ],
        removedTiles: [],
        score: 0,
        scoreGained: null,
        turns: 0,
        lose: false,
        highScore: state ? state.highScore : 0,
        highestTile: state ? state.highestTile : 2,
        highestTileThisGame: 2,
      };

      // Spawn Two Tiles
      newState = reduce(newState, spawnNewTile());
      newState = reduce(newState, spawnNewTile());

      return newState;
    }
    case Type.GET_SAVE_FILE: {
      if(state.lose) {
        return null as any;
      } else {
        return {
          ...state,
          scoreGained: 0,
        }
      }
    }
    case Type.SPAWN_TILE: {
      if (!state.board.find(x => x.find(x => x === null))) {
        let board = state.board.map(x => x.concat()).concat();
        let x, y;

        do {
          x = randomInt(0, 3);
          y = randomInt(0, 3);
        } while (board[x][y] !== null);

        board[x][y] = { id: id(), value: chance(90) ? 2 : 4 };

        // Lose check (by checking if we can still play)
        const lose = loseCheck(board);

        return {
          ...state,
          board,
          lose,
        };
      }
      return state;
    }
    case Type.MOVE: {
      let board = state.board.map(x => x.concat()).concat();
      let boardMerge: boolean[][] = board.map(x => x.map(x => false));
      const removedTiles: ITileExt[] = [];

      const flipX = action.dir === Direction.RIGHT || action.dir === Direction.DOWN;
      const rotate90 = action.dir === Direction.DOWN || action.dir === Direction.UP;

      let boardMoved = false;
      let highestTile = state.highestTile;
      let highestTileThisGame = state.highestTileThisGame;
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
              const targetTile = boardMerge[flipX ? targetJ + 1 : targetJ - 1] && boardMerge[flipX ? targetJ + 1 : targetJ - 1][i] === false && board[flipX ? targetJ + 1 : targetJ - 1][i];
              if (targetTile && targetTile.value === value) {
                value *= 2;
                targetJ += flipX ? 1 : -1;
                scoreGained += value;
              }
              if (j !== targetJ) {
                board[j][i] = null;
                const replaceTile = board[targetJ][i];
                if (replaceTile !== null) {
                  removedTiles.push({ id: replaceTile.id, value: replaceTile.value, y: targetJ, x: i, removed: true });
                  boardMerge[targetJ][i] = true;
                  highestTileThisGame = Math.max(highestTileThisGame, value);
                }
                board[targetJ][i] = { id: tile.id, value };;
                boardMoved = true;
              }
            } else {
              const targetTile = !boardMerge[i][flipX ? targetJ + 1 : targetJ - 1] && board[i][flipX ? targetJ + 1 : targetJ - 1];
              if (targetTile && targetTile.value === tile.value) {
                value *= 2;
                targetJ += flipX ? 1 : -1;
                scoreGained += value;
              }
              if (j !== targetJ) {
                board[i][j] = null;
                const replaceTile = board[i][targetJ];
                if (replaceTile !== null) {
                  removedTiles.push({ id: replaceTile.id, value: replaceTile.value, y: i, x: targetJ, removed: true });
                  boardMerge[i][targetJ] = true;
                  highestTileThisGame = Math.max(highestTileThisGame, value);
                }
                board[i][targetJ] = { id: tile.id, value };
                boardMoved = true;
              }
            }
          }
        }
      }

      highestTile = state.highScore === state.score ? highestTileThisGame : highestTile;

      if (boardMoved) {
        const score = state.score + scoreGained;

        let newState: IGame = {
          ...state,
          score: score,
          highScore: Math.max(score, state.highScore),
          turns: state.turns + 1,
          board,
          scoreGained,
          removedTiles,
          highestTile,
          highestTileThisGame,
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
