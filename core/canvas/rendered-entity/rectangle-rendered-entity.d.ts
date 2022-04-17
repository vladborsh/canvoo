import { AbstractRenderedEntity } from './abstract-rendered-entity';
import { Vector } from '../../interfaces/vector';
import { Canvas } from '../canvas';
export declare class RectangleRenderedEntity extends AbstractRenderedEntity {
    color: string;
    size: Vector;
    position: Vector;
    layer: number;
    private shadow?;
    private angle?;
    private halfSize;
    constructor(canvas: Canvas, color: string, size: Vector, position: Vector, layer: number, shadow?: string, angle?: {
        alpha: number;
    });
    draw(): void;
    private drawRectWithShift;
    private drawRect;
}
