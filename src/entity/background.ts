import { AbstractEntity } from "./abstract-entity";
import { Vector } from "../space/vector";
import { BackgroundEntity } from "../canvas/rendered-entity/background-entity";

export class Background extends AbstractEntity {

    position: Vector;
    size: Vector;

    constructor(id: string, color?: string) {
        super(id, null, null );
        this.renderedEntity = new BackgroundEntity(id, (<any>window).canvas, color ? color :'#444444' );
        (<any>window).canvas.addEntity(this.renderedEntity);
    }
}