import { Vector } from '../../../core/interfaces/vector';
import { Canvas } from '../canvas';
import { AbstractRenderedEntity } from './abstract-rendered-entity';
export declare class AnimationSprite implements AbstractRenderedEntity {
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
    isActive: boolean;
    constructor(canvas: Canvas, position: Vector, frameSize: Vector, animationLength: number, frameDuration: number, image: HTMLImageElement, layer: number, isBoomerang?: boolean, withBoundingBox?: boolean, withCameraRelation?: boolean);
    render(dt: number): void;
}
