export enum Type {
  START,
  MOVE,
  SPAWN_TILE,
};
export enum Direction {
  UP,
  DOWN,
  LEFT,
  RIGHT,
};

export type StartAction = { type: Type.START };
export type MoveAction = { type: Type.MOVE, dir: Direction };
export type SpawnTileAction = { type: Type.SPAWN_TILE };
export type ActionObject
  = StartAction
  | MoveAction
  | SpawnTileAction
  | { type: string };
