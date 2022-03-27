import { AbstractRenderedEntity } from "./abstract-rendered-entity";
import { Vector } from "../../space/vector";
import { Canvas } from "../canvas";
import { AbstractStateEntity } from "src/state/state-entity/abstract-state-entity";

export class RectangleEntity extends AbstractRenderedEntity {

    constructor(id: string, canvas: Canvas, public color: string, public size: Vector, public stateEntity: AbstractStateEntity ) {
        super(id, canvas);
        this.color = color;
        this.size = size;
    }

    public render() {
        this.canvas.context.fillStyle = this.color;
        this.canvas.context.fillRect(this.stateEntity.position.x, this.stateEntity.position.y, this.size.x, this.size.y);
    }
}