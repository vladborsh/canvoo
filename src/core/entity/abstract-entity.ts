
import { Vector } from "../interfaces/vector";
import { AbstractStateEntity } from "../state/state-entity/abstract-state-entity";
import { AbstractRenderedEntity } from "../canvas/rendered-entity/abstract-rendered-entity";
import { StateController } from "../state/state-controller";
import { Canvas } from "../canvas/canvas";

export abstract class AbstractEntity {
    
    public id: string;
    public stateEntity: AbstractStateEntity;
    public renderedEntity: AbstractRenderedEntity;
    public position: Vector;
    public size: Vector;

    constructor(id: string, position: Vector, size?: Vector ) {
        this.id = id;
        this.position = position;
        this.size = size;
    }

    public register(state: StateController, canvas: Canvas) {
        state.addEntity(this.stateEntity);
        canvas.addEntity(this.renderedEntity);
    }

    public onUpdate( func: (dt: number, stateEntity: AbstractStateEntity) => void ) {
        this.stateEntity.onUpdate(func);
    }

    public onRender( func: () => void ) {
        this.renderedEntity.render = func.bind(this.renderedEntity);
    }
}