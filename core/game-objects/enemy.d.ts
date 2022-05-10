import { AbstractRenderedEntity } from '../canvas/rendered-entity/abstract-rendered-entity';
import { Vector } from '../interfaces/vector';
import { RectangleStateEntity } from '../state/state-entity/rectangle-state.entity';
import { Aiming } from './aiming';
import { Patrolling } from './patrolling';
export declare class Enemy {
    target: Vector;
    position: Vector;
    size: Vector;
    renderSize: Vector;
    stateEntity: RectangleStateEntity;
    renderedEntity: AbstractRenderedEntity;
    patrolling: Patrolling;
    aiming: Aiming;
    constructor(target: Vector, position: Vector, size: Vector, renderSize: Vector, activationRange: number, image: HTMLImageElement, layer: number);
    onActiveRange(callback: (position: Vector, target: Vector, angleToTarget: number) => void): void;
    onOutActiveRange(callback: (position: Vector) => void): void;
}
