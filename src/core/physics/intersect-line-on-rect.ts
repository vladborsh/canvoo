import { Collider } from "../interfaces/collider";
import { Vector } from "../interfaces/vector";

/*
  Liang-Barsky line clipping algorithm
  http://www.skytopia.com/project/articles/compsci/clipping.html
 */
export function intersectLineOnRect(collider: Collider, lineStart: Vector, lineEnd: Vector): Vector[] {
  const xmin = collider.position.x - collider.size.x/2;
  const xmax = collider.position.x + collider.size.x/2;
  const ymin = collider.position.y - collider.size.y/2;
  const ymax = collider.position.y + collider.size.y/2;
  let t0 = 0;
  let t1 = 1;
  const dx = lineEnd.x - lineStart.x;
  const dy = lineEnd.y - lineStart.y;
  let p, q, r;

  for(var edge = 0; edge < 4; edge++) {   // Traverse through left, right, bottom, top edges.
    if (edge === 0) { p = -dx; q = -(xmin - lineStart.x); }
    if (edge === 1) { p =  dx; q =  (xmax - lineStart.x); }
    if (edge === 2) { p = -dy; q = -(ymin - lineStart.y); }
    if (edge === 3) { p =  dy; q =  (ymax - lineStart.y); }

    r = q / p;

    if (p === 0 && q < 0) return null;   // Don't draw line at all. (parallel line outside)

    if(p < 0) {
      if (r > t1) return null;     // Don't draw line at all.
      else if (r > t0) t0 = r;     // Line is clipped!
    } else if (p > 0) {
      if(r < t0) return null;      // Don't draw line at all.
      else if (r < t1) t1 = r;     // Line is clipped!
    }
  }

  return [
    {
      x: lineStart.x + t0 * dx,
      y: lineStart.y + t0 * dy,
    },
    {
      x: lineStart.x + t1 * dx,
      y: lineStart.y + t1 * dy,
    }
  ];
}
