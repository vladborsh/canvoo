import { Vector } from '../interfaces/vector';
import { AbstractRenderedEntity } from '../canvas/rendered-entity/abstract-rendered-entity';
import { Canvas } from '../canvas/canvas';
export declare class BackgroundFiller extends AbstractRenderedEntity {
    fragmentSize: Vector;
    images: HTMLImageElement[];
    private grid;
    constructor(canvas: Canvas, fragmentSize: Vector, images: HTMLImageElement[]);
    render(_dt: number): void;
}
