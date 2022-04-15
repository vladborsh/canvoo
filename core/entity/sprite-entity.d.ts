import { Vector } from '../interfaces/vector';
import { AbstractEntity } from './abstract-entity';
export declare class SpriteEntity extends AbstractEntity {
    constructor(position: Vector, size: Vector, image: HTMLImageElement, layer: number);
}
