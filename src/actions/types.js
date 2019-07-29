let i = 0;
function chooseNumber(str) {
  return process.env.NODE_ENV === 'production' ? i : str;
}

export const START = chooseNumber('START');
export const MOVE = chooseNumber('MOVE');
export const DIR_UP = chooseNumber('DIR_UP');
export const DIR_DOWN = chooseNumber('DIR_DOWN');
export const DIR_LEFT = chooseNumber('DIR_LEFT');
export const DIR_RIGHT = chooseNumber('DIR_RIGHT');
export const SPAWN_TILE = chooseNumber('SPAWN_TILE');
