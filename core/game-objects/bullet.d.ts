import { AbstractRenderedEntity } from '../canvas/rendered-entity/abstract-rendered-entity';
import { Collider } from '../interfaces/collider';
import { Vector } from '../interfaces/vector';
import { RectangleStateEntity } from '../state/state-entity/rectangle-state.entity';
export declare class Bullet {
    target: Vector;
    position: Vector;
    size: Vector;
    velocityMagnitude: number;
    velocity: Vector;
    stateEntity: RectangleStateEntity;
    renderedEntity: AbstractRenderedEntity;
    private currentAngle;
    private angleContainer;
    private tiles;
    private onTileHitCallback;
    private finalTile;
    constructor(target: Vector, position: Vector, size: Vector, velocityMagnitude: number, layer: number, color: string, shadow?: string);
    onTileHit(tiles: Collider[], cb: (position: Vector) => void): void;
    update(): void;
    private getTargetAngle;
    private getRandomVelDiff;
    private findTrajectory;
}
