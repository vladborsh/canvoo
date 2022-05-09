import { Collider } from '../interfaces/collider';

/*
 https://developer.mozilla.org/en-US/docs/Games/Techniques/3D_collision_detection
 */
export function intersectRects(
  collider1: Collider,
  collider2: Collider,
): boolean {
  const coll1minX = collider1.position.x - collider1.size.x / 2;
  const coll1maxX = collider1.position.x + collider1.size.x / 2;
  const coll1minY = collider1.position.y - collider1.size.y / 2;
  const coll1maxY = collider1.position.y + collider1.size.y / 2;
  const coll2minX = collider2.position.x - collider2.size.x / 2;
  const coll2maxX = collider2.position.x + collider2.size.x / 2;
  const coll2minY = collider2.position.y - collider2.size.y / 2;
  const coll2maxY = collider2.position.y + collider2.size.y / 2;

  return (
    coll1minX < coll2maxX &&
    coll1maxX > coll2minX &&
    coll1minY < coll2maxY &&
    coll1maxY > coll2minY
  );
}
