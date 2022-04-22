import { Vector } from "../../../core/interfaces/vector";
import { Canvas } from "../canvas";
import { AbstractRenderedEntity } from "./abstract-rendered-entity";
export declare class LineRenderedEntity implements AbstractRenderedEntity {
    canvas: Canvas;
    private position;
    color: string;
    layer: number;
    length: number;
    private angle;
    isActive: boolean;
    constructor(canvas: Canvas, position: Vector, color: string, layer: number, length: number, angle: {
        alpha: number;
    });
    render(): void;
}
