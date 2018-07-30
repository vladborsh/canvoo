import { Vector } from "../../space/vector";
import { Canvas } from "../canvas";

export abstract class AbstractRenderedEntity {

    public id: string;
    public position: Vector;
    public canvas: Canvas;

    constructor( id: string, canvas: Canvas, position: Vector ) {
        this.id = id;
        this.canvas = canvas;
        this.position = position;
    }

    destroy() {
        this.canvas.destroy(this.id);
    }

    abstract render(): void;

}