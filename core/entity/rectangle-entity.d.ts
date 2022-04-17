import { AbstractEntity } from './abstract-entity';
import { Vector } from '../interfaces/vector';
export declare class RectangleEntity extends AbstractEntity {
    constructor(position: Vector, size: Vector, layer: number, color: string, shadow?: string);
}
