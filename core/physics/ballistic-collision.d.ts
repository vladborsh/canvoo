import { AbstractEntity } from "../entity/abstract-entity";
import { Vector } from "../interfaces/vector";
import { AbstractStateEntity } from "../state/state-entity/abstract-state-entity";
export declare class BallisticCollision {
    private readonly FREE_ACCELERATION;
    private readonly MAXIMUM_VELOCITY;
    private readonly FRICTION;
    constructor(FREE_ACCELERATION: number, MAXIMUM_VELOCITY: Vector, FRICTION: number);
    track(stateEntity: AbstractStateEntity, blocks: AbstractEntity[], dt: number): void;
}
