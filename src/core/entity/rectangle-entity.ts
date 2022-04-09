import { AbstractEntity } from "./abstract-entity";
import { Vector } from "../interfaces/vector";
import { RectangleRenderedEntity } from "../canvas/rendered-entity/rectangle-rendered-entity";
import { AbstractStateEntity } from "../state/state-entity/abstract-state-entity";

export class RectangleEntity extends AbstractEntity {
    constructor(id: string, position: Vector, size: Vector, color?: string) {
        super(id, position, size );
        this.stateEntity = new AbstractStateEntity(id, (<any>window).state, position,  size );
        this.renderedEntity = new RectangleRenderedEntity(id, (<any>window).canvas, color ? color :'#444444', size, this.stateEntity);
    }
}