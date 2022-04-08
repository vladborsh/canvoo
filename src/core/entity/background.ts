import { AbstractEntity } from "./abstract-entity";
import { BackgroundEntity } from "../canvas/rendered-entity/background-entity";

export class Background extends AbstractEntity {
    constructor(id: string, color?: string) {
        super(id, null, null );
        this.renderedEntity = new BackgroundEntity(id, (<any>window).canvas, color ? color :'#444444' );
    }
}