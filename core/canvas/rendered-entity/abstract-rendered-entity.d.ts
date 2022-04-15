import { Canvas } from '../canvas';
export declare abstract class AbstractRenderedEntity {
    canvas: Canvas;
    layer: number;
    readonly id: string;
    constructor(canvas: Canvas, layer: number);
    destroy(): void;
    abstract render(dt: number): void;
}
