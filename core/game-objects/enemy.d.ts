import { AbstractRenderedEntity } from '../canvas/rendered-entity/abstract-rendered-entity';
import { Vector } from '../interfaces/vector';
import { RectangleStateEntity } from '../state/state-entity/rectangle-state.entity';
export declare class Enemy {
    target: Vector;
    position: Vector;
    size: Vector;
    renderSize: Vector;
    private angleContainer;
    private currentAngle;
    private currentAngleToTarget;
    velocity: Vector;
    private currentFieldOfView;
    stateEntity: RectangleStateEntity;
    renderedEntity: AbstractRenderedEntity;
    constructor(target: Vector, position: Vector, size: Vector, renderSize: Vector, image: HTMLImageElement, layer: number);
    findTarget(): void;
    private getTargetAngle;
    private adjustCurrentAngle;
}
