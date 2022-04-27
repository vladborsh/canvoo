import { Vector } from '../interfaces/vector';
import { Direction } from '../interfaces/direction';
import { Collider } from '../interfaces/collider';
export declare const FREE_ACCELERATION: Vector;
export declare type RectCollision = Record<Direction, Collision>;
interface Collision {
    isCollided: boolean;
    coordinate?: number;
}
export declare function intersectRects(collider1: Collider, collider2: Collider): boolean;
export {};
