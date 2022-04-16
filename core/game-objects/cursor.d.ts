import { Canvas } from "../canvas/canvas";
import { AbstractRenderedEntity } from "../canvas/rendered-entity/abstract-rendered-entity";
import { Vector } from "../interfaces/vector";
export declare class Cursor {
    private canvas;
    position: Vector;
    renderedEntity: AbstractRenderedEntity;
    constructor(canvas: Canvas, size: Vector, animationLength: number, frameDuration: number, image: HTMLImageElement);
}
