import { AbstractStateEntity } from './state-entity/abstract-state-entity';
import { Direction } from '../interfaces/direction';
export declare class StateController {
    entities: AbstractStateEntity[];
    readonly controlState: Record<Direction, boolean>;
    constructor();
    addEntity(entity: AbstractStateEntity): void;
    destroy(id: string): void;
    update(dt: number): void;
}
