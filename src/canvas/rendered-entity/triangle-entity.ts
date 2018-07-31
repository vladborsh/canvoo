import { AbstractRenderedEntity } from "./abstract-rendered-entity";
import { Canvas } from "../canvas";
import { Vector } from "../../space/vector";
import { calculateCenter } from "../../utils/calc";

export class TriangleEntity extends AbstractRenderedEntity {

    public points: Vector[];
    public color: string;
    
    constructor(id: string, canvas: Canvas, color: string, p1: Vector, p2: Vector, p3: Vector ) {
        super(id, canvas, calculateCenter(p1, p2, p3));
        this.color = color;
        this.points = [p1, p2, p3];
    }

    public render(): void {
        this.canvas.context.fillStyle = this.color;
        this.canvas.context.beginPath();
        this.points.forEach((point: Vector, i: number) => i === 0 
            ? this.canvas.context.moveTo(point.x, point.y)
            : this.canvas.context.lineTo(point.x, point.y)
        );
        this.canvas.context.closePath();
        this.canvas.context.fill();
    } 

}