export enum Type {
  START,
  MOVE,
  SPAWN_TILE,
  GET_SAVE_FILE,
};
export enum Direction {
  UP = 'UP',
  DOWN = 'DOWN',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
};

export type StartAction = { type: Type.START };
export type MoveAction = { type: Type.MOVE, dir: Direction };
export type SpawnTileAction = { type: Type.SPAWN_TILE };
export type ActionObject
  = StartAction
  | MoveAction
  | SpawnTileAction
  | { type: string };
