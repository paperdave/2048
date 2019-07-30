import { Type, Direction, StartAction, MoveAction, SpawnTileAction } from "./types";

export function start(): StartAction {
  return { type: Type.START };
}
export function moveUp(): MoveAction {
  return { type: Type.MOVE, dir: Direction.UP };
}
export function moveDown(): MoveAction {
  return { type: Type.MOVE, dir: Direction.DOWN };
}
export function moveLeft(): MoveAction {
  return { type: Type.MOVE, dir: Direction.LEFT };
}
export function moveRight(): MoveAction {
  return { type: Type.MOVE, dir: Direction.RIGHT };
}
export function spawnNewTile(): SpawnTileAction {
  return { type: Type.SPAWN_TILE };
}
