import { Collider } from "../interfaces/collider";
import { PhysicsState } from "../state/state-entity/physics-state";
export declare class Patrolling {
    physicsState: PhysicsState;
    MOVE_ACCELERATION: number;
    private isActive;
    constructor(physicsState: PhysicsState, MOVE_ACCELERATION?: number);
    horizontalPatrol(tiles: Collider[]): void;
    activate(): void;
    deactivate(): void;
    private checkSideWalls;
    private checkTilesBottom;
    private getDefault;
}
