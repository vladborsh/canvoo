import { Collider } from "../interfaces/collider";
import { Vector } from "../interfaces/vector";
export interface TileSegment {
    tile: Collider;
    point: Vector;
}
export declare function findNearest(point: Vector, targets: TileSegment[]): TileSegment;
