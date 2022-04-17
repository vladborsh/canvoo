import { Canvas } from '../canvas/canvas';
import { AbstractEntity } from '../entity/abstract-entity';
import { Vector } from '../interfaces/vector';
export declare class Cursor extends AbstractEntity {
    private canvas;
    cursorPosition: Vector;
    position: Vector;
    constructor(canvas: Canvas, size: Vector, animationLength: number, frameDuration: number, image: HTMLImageElement);
    private update;
}
