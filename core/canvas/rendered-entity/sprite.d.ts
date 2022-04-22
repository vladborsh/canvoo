import { Vector } from 'src/core/interfaces/vector';
import { Canvas } from '../canvas';
import { AbstractRenderedEntity } from './abstract-rendered-entity';
export declare class Sprite implements AbstractRenderedEntity {
    canvas: Canvas;
    private position;
    size: Vector;
    private image;
    layer: number;
    private angle?;
    private drawBox?;
    private halfSize;
    isActive: boolean;
    constructor(canvas: Canvas, position: Vector, size: Vector, image: HTMLImageElement, layer: number, angle?: {
        alpha: number;
    }, drawBox?: boolean);
    render(): void;
    private drawImageWithShift;
    private drawImage;
}
