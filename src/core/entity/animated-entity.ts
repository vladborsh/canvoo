import { Sprite } from "../canvas/rendered-entity/sprite";
import { Vector } from "../interfaces/vector";
import { AbstractStateEntity } from "../state/state-entity/abstract-state-entity";
import { AbstractEntity } from "./abstract-entity";

export class AnimatedEntity extends AbstractEntity {
    constructor(
        id: string, 
        position: Vector, 
        size: Vector, 
        frameSize: Vector,
        animationLength: number,
        frameDuration: number,
        image: HTMLImageElement,
    ) {
        super(id, position, size );
        this.stateEntity = new AbstractStateEntity(id, (<any>window).state, position,  size );
        this.renderedEntity = new Sprite(
            id, 
            (<any>window).canvas,
            this.stateEntity,
            frameSize,
            animationLength,
            frameDuration,
            image,
        );
    }
}