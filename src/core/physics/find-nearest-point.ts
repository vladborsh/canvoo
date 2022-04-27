import { Collider } from "../interfaces/collider";
import { Vector } from "../interfaces/vector";


export interface TileSegment {
  tile: Collider,
  point: Vector,
}

export function findNearest(point: Vector, targets: TileSegment[]): TileSegment {
  if (!targets.length) {
    return null;
  }

  let distance = getDistance(targets[0].point, point);
  let nearestTarget = targets[0];

  for (let target of targets) {
    const newDistance = getDistance(target.point, point);
    if (newDistance < distance) {
      distance = newDistance;
      nearestTarget = target;
    }
  }

  return nearestTarget;
}

function getDistance(a: Vector, b: Vector): number {
  return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2))
}
