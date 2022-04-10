import { Vector } from "../interfaces/vector";
import { multiply, sum } from "./calc";

const FREE_ACCELERATION: Vector = { x: 0, y: 100 };

/*
 https://developer.mozilla.org/en-US/docs/Games/Techniques/3D_collision_detection

 return (a.minX <= b.maxX && a.maxX >= b.minX) &&
         (a.minY <= b.maxY && a.maxY >= b.minY)
 */
export function intersect(position1: Vector, size1: Vector, position2: Vector, size2: Vector): boolean {
    return (
        position1.x <= position2.x + size2.x
        && position1.x + size1.x >= position2.x
    ) && (
        position1.y <= position2.y + size2.y
        && position1.y + size1.y >= position2.y
    );
}

export function getFreeAccelerationVelocity(startVelocity: Vector, dt: number): Vector {
  return sum(
    startVelocity,
    multiply(FREE_ACCELERATION, dt / 500)
  );
}
