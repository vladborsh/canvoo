import { AbstractRenderedEntity } from './abstract-rendered-entity';
import { Vector } from '../../interfaces/vector';
import { Canvas } from '../canvas';
export declare class RectangleRenderedEntity implements AbstractRenderedEntity {
    canvas: Canvas;
    color: string;
    size: Vector;
    position: Vector;
    layer: number;
    private shadow?;
    private angle?;
    private halfSize;
    isActive: boolean;
    constructor(canvas: Canvas, color: string, size: Vector, position: Vector, layer: number, shadow?: string, angle?: {
        alpha: number;
    });
    render(): void;
    private drawRectWithShift;
    private drawRect;
}
