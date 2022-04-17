import { Vector } from 'src/core/interfaces/vector';
import { Canvas } from '../canvas';
import { AbstractRenderedEntity } from './abstract-rendered-entity';
export declare class AnimationSprite extends AbstractRenderedEntity {
    canvas: Canvas;
    position: Vector;
    frameSize: Vector;
    animationLength: number;
    frameDuration: number;
    image: HTMLImageElement;
    layer: number;
    private isBoomerang;
    private withBoundingBox;
    private withCameraRelation;
    private currentFrame;
    private elapsedTimeBetweenFrames;
    private direction;
    private halfSize;
    constructor(canvas: Canvas, position: Vector, frameSize: Vector, animationLength: number, frameDuration: number, image: HTMLImageElement, layer: number, isBoomerang?: boolean, withBoundingBox?: boolean, withCameraRelation?: boolean);
    draw(dt: number): void;
}
