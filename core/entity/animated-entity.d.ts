import { Vector } from '../interfaces/vector';
import { AbstractEntity } from './abstract-entity';
export declare class AnimatedEntity extends AbstractEntity {
    constructor(position: Vector, size: Vector, animationLength: number, frameDuration: number, image: HTMLImageElement, layer: number, isBoomerang?: boolean, withBoundingBox?: boolean);
}
