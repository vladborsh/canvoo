import { AbstractRenderedEntity } from "./abstract-rendered-entity";
import { Vector } from "../../space/vector";
import { Canvas } from "../canvas";

export class RectangleRenderedEntity extends AbstractRenderedEntity {

    public color: string;
    public size: Vector;

    constructor(id: string, canvas: Canvas, color: string, position: Vector, size: Vector ) {
        super(id, canvas, position);
        this.color = color;
        this.size = size;
    }

    public render() {
        this.canvas.context.fillStyle = this.color;
        console.log(this.position.x, this.position.y, this.size.x, this.size.y);
        this.canvas.context.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
    }
}