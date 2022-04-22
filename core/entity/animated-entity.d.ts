import { AbstractRenderedEntity } from '../canvas/rendered-entity/abstract-rendered-entity';
import { Vector } from '../interfaces/vector';
import { AbstractStateEntity } from '../state/state-entity/abstract-state-entity';
export declare class AnimatedEntity {
    stateEntity: AbstractStateEntity;
    renderedEntity: AbstractRenderedEntity;
    constructor(position: Vector, size: Vector, animationLength: number, frameDuration: number, image: HTMLImageElement, layer: number, isBoomerang?: boolean, withBoundingBox?: boolean);
}
