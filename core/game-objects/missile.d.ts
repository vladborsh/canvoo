import { AbstractRenderedEntity } from '../canvas/rendered-entity/abstract-rendered-entity';
import { Vector } from '../interfaces/vector';
import { AbstractStateEntity } from '../state/state-entity/abstract-state-entity';
export declare class Missile {
    target: Vector;
    position: Vector;
    size: Vector;
    renderSize: Vector;
    velocityMagnitude: number;
    velocity: Vector;
    stateEntity: AbstractStateEntity;
    renderedEntity: AbstractRenderedEntity;
    private currentAngle;
    private angleChangeVelocity;
    private angleContainer;
    private fireTail;
    constructor(target: Vector, position: Vector, size: Vector, renderSize: Vector, velocityMagnitude: number, image: HTMLImageElement, layer: number);
    update(dt: number, stateEntity: AbstractStateEntity): void;
    private setVelocity;
    private getTargetAngle;
}
