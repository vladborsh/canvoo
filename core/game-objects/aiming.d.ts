import { Vector } from "../interfaces/vector";
export declare class Aiming {
    target: Vector;
    position: Vector;
    activationRange?: number;
    alpha: number;
    private currentAngleToTarget;
    isAiming: boolean;
    constructor(target: Vector, position: Vector, activationRange?: number);
    aim(): void;
    private adjustCurrentAngle;
    private isFrom2to3Quadrant;
    private isFrom3to2Quadrant;
    private getTargetDistance;
    private getTargetAngle;
}
