import { Canvas } from "../canvas";

export abstract class AbstractRenderedEntity {
    constructor( public id: string, public canvas: Canvas ) {}

    destroy() {
        this.canvas.destroy(this.id);
    }

    abstract render(dt: number): void;
}