import { AbstractEntity } from '../entity/abstract-entity';
import { Vector } from '../interfaces/vector';
export declare class Bullet extends AbstractEntity {
    target: Vector;
    position: Vector;
    size: Vector;
    velocityMagnitude: number;
    velocity: Vector;
    private currentAngle;
    private angleContainer;
    constructor(target: Vector, position: Vector, size: Vector, velocityMagnitude: number, layer: number, color: string, shadow?: string);
    update(): void;
    private getTargetAngle;
    private getRandomVelDiff;
}
