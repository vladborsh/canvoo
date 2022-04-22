import { Canvas } from "../canvas/canvas";
import { Vector } from "../interfaces/vector";
export declare class Weapon {
    target: Vector;
    position: Vector;
    size: Vector;
    private angleContainer;
    private currentAngle;
    private stateEntity;
    private renderedEntity;
    constructor(target: Vector, position: Vector, size: Vector, image: HTMLImageElement, layer: number, canvas: Canvas);
    update(): void;
    private getTargetAngle;
}
