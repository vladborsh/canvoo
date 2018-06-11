import { AbstractRenderedEntity } from "./abstract-rendered-entity";
import { Vector } from "../../space/vector";
import { Canvas } from "../canvas";

export class BackgroundEntity extends AbstractRenderedEntity {

    public color: string;

    constructor(id: string, canvas: Canvas, color: string ) {
        super(id, canvas, {x:0,y:0});
        this.color = color;
    }

    public render() {
        this.canvas.context.fillStyle = this.color;
        this.canvas.context.fillRect(0, 0, this.canvas.canvas.width, this.canvas.canvas.height);
    }
}