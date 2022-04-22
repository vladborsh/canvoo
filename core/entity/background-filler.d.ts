import { Vector } from '../interfaces/vector';
import { AbstractRenderedEntity } from '../canvas/rendered-entity/abstract-rendered-entity';
import { Canvas } from '../canvas/canvas';
export declare class BackgroundFiller implements AbstractRenderedEntity {
    canvas: Canvas;
    fragmentSize: Vector;
    images: HTMLImageElement[];
    layer: number;
    private grid;
    isActive: boolean;
    constructor(canvas: Canvas, fragmentSize: Vector, images: HTMLImageElement[], layer: number);
    render(): void;
}
