
import { Vector } from "../space/vector";
import { AbstractStateEntity } from "../state/state-entity/abstract-state-entity";
import { AbstractRenderedEntity } from "../canvas/rendered-entity/abstract-rendered-entity";

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
    }

    update( func: () => void ) {
        this.stateEntity.update = func.bind(this.stateEntity);
    }

    render( func: () => void ) {
        this.renderedEntity.render = func.bind(this.renderedEntity);
    }

}