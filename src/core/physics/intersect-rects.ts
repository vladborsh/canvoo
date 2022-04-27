import { Vector } from '../interfaces/vector';
import { Direction } from '../interfaces/direction';
import { multiply, sum } from '../utils/calc';
import { Collider } from '../interfaces/collider';

export const FREE_ACCELERATION: Vector = { x: 0, y: 80 };

export type RectCollision = Record<Direction, Collision>;

interface Collision {
  isCollided: boolean;
  coordinate?: number;
}

/*
 https://developer.mozilla.org/en-US/docs/Games/Techniques/3D_collision_detection
 */
export function intersectRects(
  collider1: Collider,
  collider2: Collider,
): boolean {
  return (
    collider1.position.x < collider2.position.x + collider2.size.x &&
    collider1.position.x + collider1.size.x > collider2.position.x &&
    collider1.position.y < collider2.position.y + collider2.size.y &&
    collider1.position.y + collider1.size.y > collider2.position.y
  );
}
