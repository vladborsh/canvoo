
import { Vector } from "../space/vector";
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

    constructor(id: string, position: Vector, size: Vector ) {
        this.id = id;
        this.position = position;
        this.size = size;
        this.bindIt();
    }

    public bind(state: StateController, canvas: Canvas) {
        state.addEntity(this.stateEntity);
        canvas.addEntity(this.renderedEntity);
    }

    public update( func: () => void ) {
        this.stateEntity.update = func.bind(this.stateEntity);
    }

    public render( func: () => void ) {
        this.renderedEntity.render = func.bind(this.renderedEntity);
    }

    private bindIt() {
        if ((<any>window)['abstract_entity_storage'] === undefined) {
            (<any>window)['abstract_entity_storage'] = [];
        }
        (<any>window)['abstract_entity_storage'].push(this);
    }

}