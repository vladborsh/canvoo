import { AbstractEntity } from "./abstract-entity";
import { Vector } from "../space/vector";
import { CommonStateEntity } from "../state/state-entity/common-state-entity";
import { RectangleEntity } from "../canvas/rendered-entity/rectangle-entity";

export class TestingCube extends AbstractEntity {

    position: Vector;
    size: Vector;

    constructor(id: string, position: Vector, size: Vector, color?: string) {
        super(id, position, size );
        this.stateEntity = new CommonStateEntity(id, (<any>window).state, position,  size );
        this.renderedEntity = new RectangleEntity(id, (<any>window).canvas, color ? color :'#444444', position, size );
    }
}