import { AbstractEntity } from '../entity/abstract-entity';
import { Vector } from '../interfaces/vector';
import { AbstractStateEntity } from '../state/state-entity/abstract-state-entity';
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
    private fireTail;
    constructor(target: Vector, position: Vector, size: Vector, renderSize: Vector, velocityMagnitude: number, image: HTMLImageElement, layer: number);
    update(dt: number, stateEntity: AbstractStateEntity): void;
    private setVelocity;
    private getTargetAngle;
}
