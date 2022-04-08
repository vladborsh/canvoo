import { AbstractRenderedEntity } from "./abstract-rendered-entity";
import { Vector } from "../../interfaces/vector";
import { Canvas } from "../canvas";
import { AbstractStateEntity } from "../../state/state-entity/abstract-state-entity";

export class RectangleEntity extends AbstractRenderedEntity {
    constructor(id: string, canvas: Canvas, public color: string, public size: Vector, public stateEntity: AbstractStateEntity ) {
        super(id, canvas);
    }

    public render() {
        this.canvas.context.fillStyle = this.color;
        this.canvas.context.fillRect(this.stateEntity.position.x, this.stateEntity.position.y, this.size.x, this.size.y);
    }
}