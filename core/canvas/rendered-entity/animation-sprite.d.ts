import { Vector } from 'src/core/interfaces/vector';
import { AbstractStateEntity } from 'src/core/state/state-entity/abstract-state-entity';
import { Canvas } from '../canvas';
import { AbstractRenderedEntity } from './abstract-rendered-entity';
export declare class AnimationSprite extends AbstractRenderedEntity {
    canvas: Canvas;
    stateEntity: AbstractStateEntity;
    frameSize: Vector;
    animationLength: number;
    frameDuration: number;
    image: HTMLImageElement;
    layer: number;
    private isBoomerang;
    private withBoundingBox;
    private currentFrame;
    private elapsedTimeBetweenFrames;
    private direction;
    constructor(canvas: Canvas, stateEntity: AbstractStateEntity, frameSize: Vector, animationLength: number, frameDuration: number, image: HTMLImageElement, layer: number, isBoomerang?: boolean, withBoundingBox?: boolean);
    render(dt: number): void;
}
