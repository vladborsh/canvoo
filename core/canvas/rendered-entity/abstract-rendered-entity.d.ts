import { Vector } from 'src/core/interfaces/vector';
import { Canvas } from '../canvas';
export declare abstract class AbstractRenderedEntity {
    canvas: Canvas;
    size: Vector;
    layer: number;
    readonly id: string;
    render: (dt: number) => void;
    constructor(canvas: Canvas, size: Vector, layer: number);
    destroy(): void;
    onRender(func: (dt: number, entity: AbstractRenderedEntity) => void): void;
}
