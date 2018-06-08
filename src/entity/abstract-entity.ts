import { RectangleRenderedEntity } from "../canvas/rendered-entity/rectangle-rendered-entity";
import { Vector } from "../space/vector";
import { CommonStateEntity } from "../state/state-entity/common-state-entity";

export abstract class AbstractEntity {
    
    public stateEntity: CommonStateEntity;
    public renderedEntity: RectangleRenderedEntity;
    public position: Vector;
    public size: Vector;

    constructor(id: string, position: Vector, size: Vector, color?: string ) {
        this.stateEntity = new CommonStateEntity(id, (<any>window).state, position,  size );
        (<any>window).state.addEntity(this.stateEntity );
        this.renderedEntity = new RectangleRenderedEntity(id, (<any>window).canvas, color ? color :'#444444', position, size );
        (<any>window).canvas.addEntity(this.renderedEntity);
    }

    update( func: () => void ) {
        this.stateEntity.update = func.bind(this.stateEntity);
    }

    render( func: () => void ) {
        this.renderedEntity.render = func.bind(this.renderedEntity);
    }

}