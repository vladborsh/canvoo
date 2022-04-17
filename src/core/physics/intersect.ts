import { Vector } from '../interfaces/vector';
import { Direction } from '../interfaces/direction';
import { multiply, sum } from '../utils/calc';

export const FREE_ACCELERATION: Vector = { x: 0, y: 80 };

export type RectCollision = Record<Direction, Collision>;

interface Collision {
  isCollided: boolean;
  coordinate?: number;
}

/*
 https://developer.mozilla.org/en-US/docs/Games/Techniques/3D_collision_detection
 */
export function intersect(
  position1: Vector,
  size1: Vector,
  position2: Vector,
  size2: Vector
): boolean {
  return (
    position1.x < position2.x + size2.x &&
    position1.x + size1.x > position2.x &&
    position1.y < position2.y + size2.y &&
    position1.y + size1.y > position2.y
  );
}
