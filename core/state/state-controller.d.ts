import { AbstractStateEntity } from './state-entity/abstract-state-entity';
export declare enum ControlButton {
    SPACE = "SPACE"
}
export declare class StateController {
    entities: AbstractStateEntity[];
    readonly controlState: Record<string, boolean>;
    constructor();
    addEntity(entity: AbstractStateEntity): void;
    destroy(id: string): void;
    update(dt: number): void;
}
