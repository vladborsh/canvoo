import { Vector } from "../interfaces/vector";
export declare class ParticleSource {
    position: Vector;
    singleParticleSize: Vector;
    velocity: Vector;
    color: string;
    reduceSize: boolean;
    particleLifetime: number;
    isInfinite: boolean;
    velocityDiffRange: number;
    layer: number;
    particleCount: number;
    shadow?: string;
    private particles;
    constructor(position: Vector, singleParticleSize: Vector, velocity: Vector, color: string, reduceSize: boolean, particleLifetime: number, isInfinite: boolean, velocityDiffRange: number, layer: number, particleCount: number, shadow?: string);
    private getRandomVelDiff;
}
