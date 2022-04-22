import { Block } from "../interfaces/block";
import { Vector } from "../interfaces/vector";
import { PhysicsState } from "../state/state-entity/physics-state";
export declare class BallisticCollision {
    private readonly FREE_ACCELERATION;
    private readonly MAXIMUM_VELOCITY;
    private readonly FRICTION;
    constructor(FREE_ACCELERATION: number, MAXIMUM_VELOCITY: Vector, FRICTION: number);
    track(stateEntity: PhysicsState, blocks: Block[], dt: number): void;
}
