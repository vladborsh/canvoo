import { Canvas } from "../canvas/canvas";
import { AbstractEntity } from "../entity/abstract-entity";
import { Vector } from "../interfaces/vector";
export declare class Weapon extends AbstractEntity {
    target: Vector;
    position: Vector;
    size: Vector;
    private currentAngle;
    private angleContainer;
    constructor(target: Vector, position: Vector, size: Vector, image: HTMLImageElement, layer: number, canvas: Canvas);
    update(): void;
    private getTargetAngle;
}
