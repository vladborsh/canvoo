import { Vector } from '../interfaces/vector';
import { AbstractStateEntity } from '../state/state-entity/abstract-state-entity';
import { AbstractRenderedEntity } from '../canvas/rendered-entity/abstract-rendered-entity';
export declare abstract class AbstractEntity {
    position: Vector;
    size?: Vector;
    readonly id: string;
    stateEntity: AbstractStateEntity;
    renderedEntity: AbstractRenderedEntity;
    constructor(position: Vector, size?: Vector);
    onUpdate(func: (dt: number, stateEntity: AbstractStateEntity) => void): void;
    onRender(func: (dt: number, entity: AbstractRenderedEntity) => void): void;
}
