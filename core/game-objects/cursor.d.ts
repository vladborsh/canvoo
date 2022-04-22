import { Canvas } from '../canvas/canvas';
import { AbstractRenderedEntity } from '../canvas/rendered-entity/abstract-rendered-entity';
import { Vector } from '../interfaces/vector';
import { AbstractStateEntity } from '../state/state-entity/abstract-state-entity';
export declare class Cursor {
    private canvas;
    cursorPosition: Vector;
    position: Vector;
    stateEntity: AbstractStateEntity;
    renderedEntity: AbstractRenderedEntity;
    constructor(canvas: Canvas, size: Vector, animationLength: number, frameDuration: number, image: HTMLImageElement);
    private update;
}
