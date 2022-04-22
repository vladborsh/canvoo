import { AbstractRenderedEntity } from '../canvas/rendered-entity/abstract-rendered-entity';
import { Vector } from '../interfaces/vector';
import { AbstractStateEntity } from '../state/state-entity/abstract-state-entity';
export declare class Bullet {
    target: Vector;
    position: Vector;
    size: Vector;
    velocityMagnitude: number;
    velocity: Vector;
    stateEntity: AbstractStateEntity;
    renderedEntity: AbstractRenderedEntity;
    private currentAngle;
    private angleContainer;
    constructor(target: Vector, position: Vector, size: Vector, velocityMagnitude: number, layer: number, color: string, shadow?: string);
    update(): void;
    private getTargetAngle;
    private getRandomVelDiff;
}
