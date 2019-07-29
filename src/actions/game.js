import { START, MOVE, DIR_UP, DIR_DOWN, DIR_LEFT, DIR_RIGHT, SPAWN_TILE } from "./types";

export function start() {
  return { type: START };
}
export function moveUp() {
  return { type: MOVE, dir: DIR_UP };
}
export function moveDown() {
  return { type: MOVE, dir: DIR_DOWN };
}
export function moveLeft() {
  return { type: MOVE, dir: DIR_LEFT };
}
export function moveRight() {
  return { type: MOVE, dir: DIR_RIGHT };
}
export function spawnNewTile() {
  return { type: SPAWN_TILE };
}
