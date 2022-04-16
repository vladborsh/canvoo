import { AbstractEntity } from "../entity/abstract-entity";
import { Vector } from "../interfaces/vector";
export declare class Missile extends AbstractEntity {
    target: Vector;
    position: Vector;
    size: Vector;
    renderSize: Vector;
    velocityMagnitude: number;
    velocity: Vector;
    private currentAngle;
    private ANGLE_VELOCITY;
    private angleContainer;
    constructor(target: Vector, position: Vector, size: Vector, renderSize: Vector, velocityMagnitude: number, image: HTMLImageElement, layer: number);
    update(): void;
    private setVelocity;
    private getTargetAngle;
}
