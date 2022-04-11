import { Vector } from '../interfaces/vector';
import { Direction } from '../interfaces/direction';
import { multiply, sum } from '../utils/calc';

export const FREE_ACCELERATION: Vector = { x: 0, y: 100 };

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

export function setCollisions(
  setCollisions: Record<Direction, Collision>,
  targetPosition: Vector,
  targetSize: Vector,
  position2: Vector,
  size2: Vector
): void {
  if (
    targetPosition.y <= position2.y + size2.y &&
    targetPosition.y + targetSize.y >= position2.y + size2.y
  ) {
    setCollisions[Direction.UP] = { isCollided: true, coordinate: position2.y + size2.y };
  }
  if (targetPosition.y + targetSize.y >= position2.y && targetPosition.y <= position2.y) {
    setCollisions[Direction.DOWN] = { isCollided: true, coordinate: position2.y };
  }
  if (
    targetPosition.x <= position2.x + size2.x &&
    targetPosition.x + targetSize.x >= position2.x + size2.x
  ) {
    setCollisions[Direction.LEFT] = { isCollided: true, coordinate: position2.x + size2.x };
  }
  if (targetPosition.x + targetSize.x >= position2.x && targetPosition.x <= position2.x) {
    setCollisions[Direction.RIGHT] = { isCollided: true, coordinate: position2.x };
  }
}

export function getFreeAccelerationVelocity(startVelocity: Vector, dt: number): Vector {
  return sum(startVelocity, multiply(FREE_ACCELERATION, dt / 500));
}
