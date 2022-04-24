import { Collider } from "../interfaces/collider";
import { Vector } from "../interfaces/vector";
import { PhysicsState } from "../state/state-entity/physics-state";
export declare class TilesCollision {
    private readonly GRAVITY;
    private readonly MAXIMUM_VELOCITY;
    private readonly FRICTION;
    constructor(GRAVITY: number, MAXIMUM_VELOCITY: Vector, FRICTION: number);
    track(stateEntity: PhysicsState, blocks: Collider[], dt: number): void;
}
