import { Vector } from 'src/core/interfaces/vector';
import { AbstractStateEntity } from 'src/core/state/state-entity/abstract-state-entity';
import { Canvas } from '../canvas';
import { AbstractRenderedEntity } from './abstract-rendered-entity';
export declare class Sprite extends AbstractRenderedEntity {
    canvas: Canvas;
    private stateEntity;
    private size;
    private image;
    layer: number;
    private angle?;
    constructor(canvas: Canvas, stateEntity: AbstractStateEntity, size: Vector, image: HTMLImageElement, layer: number, angle?: {
        alpha: number;
    });
    render(): void;
    private drawImageWithShift;
    private drawImage;
}
