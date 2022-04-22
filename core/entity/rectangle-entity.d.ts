import { Vector } from '../interfaces/vector';
import { AbstractRenderedEntity } from '../canvas/rendered-entity/abstract-rendered-entity';
import { RectangleStateEntity } from '../state/state-entity/rectangle-state.entity';
export declare class RectangleEntity {
    stateEntity: RectangleStateEntity;
    renderedEntity: AbstractRenderedEntity;
    constructor(position: Vector, size: Vector, layer: number, color: string, shadow?: string);
}
