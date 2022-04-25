import { Vector } from "../../interfaces/vector";
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
    acceleratedMotion(dt: number): void;
    private applyGravity;
    private applyFriction;
    private adjustMaximumVelocityY;
    private adjustMaximumVelocityX;
    private adjustMinVelocityX;
}
