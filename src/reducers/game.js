import { START, spawnNewTile, SPAWN_TILE, MOVE, DIR_DOWN, DIR_RIGHT, DIR_UP, start } from '../actions';

function id() {
  return Math.random().toString().substr(2)
}

export default function reduce(state, action) {
  // Initial Logic: Start a game.
  if(!state) {
    return reduce({}, start());
  }

  switch (action.type) {
    case START: {
      let newState = {
        board: [
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
        ],
        score: 0,
        scoreGained: false,
        turns: 0,
      };

      // Spawn Two Tiles
      newState = reduce(newState, spawnNewTile());
      newState = reduce(newState, spawnNewTile());

      return newState;
    }
    case SPAWN_TILE: {
      if (!state.board.find(x => x.find(x => x === 0))) {
        let board = state.board.map(x => x.concat()).concat();
        let x, y;

        do {
          x = Math.floor(Math.random() * 4);
          y = Math.floor(Math.random() * 4);
        } while (board[x][y] !== 0);

        board[x][y] = Math.random() < 0.9 ? 2 : 4;

        return {
          ...state,
          board,
        };
      }
      return state;
    }
    case MOVE: {
      let board = state.board.map(x => x.concat()).concat();

      const flipX = action.dir === DIR_RIGHT || action.dir === DIR_DOWN;
      const rotate90 = action.dir === DIR_DOWN || action.dir === DIR_UP;

      let boardMoved = false;
      let scoreGained = 0;

      for (let i = 0; i < 4; i++) {
        for (let j = flipX ? 3 : 0; flipX ? j >= 0 : j < 4; j += flipX ? -1 : 1) {
          let val = rotate90 ? board[j][i] : board[i][j];
          if (val) {
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
              if (board[flipX ? targetJ + 1 : targetJ - 1] && board[flipX ? targetJ + 1 : targetJ - 1][i] === val) {
                val *= 2;
                targetJ += flipX ? 1 : -1;
                scoreGained += val;
              }
              if (j !== targetJ) {
                board[j][i] = 0;
                board[targetJ][i] = val;
                boardMoved = true;
              }
            } else {
              if (board[i][flipX ? targetJ + 1 : targetJ - 1] === val) {
                val *= 2;
                targetJ += flipX ? 1 : -1;
                scoreGained += val;
              }
              if (j !== targetJ) {
                board[i][j] = 0;
                board[i][targetJ] = val;
                boardMoved = true;
              }
            }
          }
        }
      }

      if (boardMoved) {
        let newState = {
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
