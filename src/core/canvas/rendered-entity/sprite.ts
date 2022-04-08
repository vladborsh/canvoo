import { Vector } from "src/core/interfaces/vector";
import { AbstractStateEntity } from "src/core/state/state-entity/abstract-state-entity";
import { Canvas } from "../canvas";
import { AbstractRenderedEntity } from "./abstract-rendered-entity";

export class Sprite extends AbstractRenderedEntity {
    constructor(
        public id: string,
        public canvas: Canvas,
        public size: Vector, 
        public stateEntity: AbstractStateEntity,
        public frameSize: Vector,
        public framesLength: Vector,
    ) {
        super(id, canvas);
    }

    public render() {
        this.canvas.context.fillRect(this.stateEntity.position.x, this.stateEntity.position.y, this.size.x, this.size.y);
    }
}