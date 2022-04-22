import { Vector } from "src/core/interfaces/vector";
import { AbstractStateEntity } from "./abstract-state-entity";
import { PhysicsState } from "./physics-state";
export declare class RectangleStateEntity implements AbstractStateEntity {
    controlState: Record<string, boolean>;
    position: Vector;
    size: Vector;
    physicsState: PhysicsState;
    constructor(controlState: Record<string, boolean>, position: Vector, size: Vector);
    update(dt: number, stateEntity: RectangleStateEntity): void;
}
