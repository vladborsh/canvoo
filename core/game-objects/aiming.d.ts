import { Vector } from "../interfaces/vector";
export declare class Aiming {
    target: Vector;
    position: Vector;
    activationRange?: number;
    alpha: number;
    private currentAngleToTarget;
    isAiming: boolean;
    private onActiveRangeCb;
    private onOutActiveRangeCb;
    constructor(target: Vector, position: Vector, activationRange?: number);
    onActiveRange(callback: (position: Vector, target: Vector, angleToTarget: number) => void): void;
    onOutActiveRange(callback: (position: Vector) => void): void;
    aim(): void;
    private adjustCurrentAngle;
    private isFrom2to3Quadrant;
    private isFrom3to2Quadrant;
    private getTargetDistance;
    private getTargetAngle;
}
