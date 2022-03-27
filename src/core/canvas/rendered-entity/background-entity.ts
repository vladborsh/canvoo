import { AbstractRenderedEntity } from "./abstract-rendered-entity";
import { Vector } from "../../space/vector";
import { Canvas } from "../canvas";

export class BackgroundEntity extends AbstractRenderedEntity {
    constructor(id: string, canvas: Canvas, public color: string ) {
        super(id, canvas);
    }

    public render() {
        this.canvas.context.fillStyle = this.color;
        this.canvas.context.fillRect(0, 0, this.canvas.canvas.width, this.canvas.canvas.height);
    }
}