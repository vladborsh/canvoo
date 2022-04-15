import { Vector } from '../../interfaces/vector';
import { StateController } from '../state-controller';
import { Direction } from '../../interfaces/direction';
export declare class AbstractStateEntity {
    stateController: StateController;
    position: Vector;
    size: Vector;
    readonly id: string;
    readonly controlState: Record<Direction, boolean>;
    prevPosition: Vector;
    velocity: Vector;
    acceleration: Vector;
    onGround: boolean;
    spaceBottom: boolean;
    leftWall: boolean;
    rightWall: boolean;
    update: (dt: number) => void;
    constructor(stateController: StateController, position?: Vector, size?: Vector);
    destroy(): void;
    onUpdate(func: (dt: number, stateEntity: AbstractStateEntity) => void): void;
}
