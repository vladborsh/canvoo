import { Vector } from "src/core/interfaces/vector";
export declare class PhysicsState {
    prevPosition: Vector;
    position: Vector;
    size: Vector;
    velocity: Vector;
    acceleration: Vector;
    onGround: boolean;
    spaceBottom: boolean;
    leftWall: boolean;
    rightWall: boolean;
}
