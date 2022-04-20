import { Vector } from "../../../core/interfaces/vector";
import { Canvas } from "../canvas";
import { AbstractRenderedEntity } from "./abstract-rendered-entity";

export class LineRenderedEntity extends AbstractRenderedEntity {
  constructor(
    public canvas: Canvas,
    private position: Vector,
    public color: string,
    public layer: number,
    public length: number,
    private angle: { alpha: number },
  ) {
    super(canvas, { x: 0, y: 0 }, layer);
    this.onRender(() => this.draw());
  }

  public draw() {
    const target = {
      x: this.position.x + this.length * Math.cos(this.angle.alpha),
      y: this.position.y + this.length * Math.sin(this.angle.alpha),
    }

    this.canvas.context.strokeStyle = this.color;
    this.canvas.context.beginPath();
    this.canvas.context.moveTo(
      this.position.x - (this.canvas.cameraPosition.x - this.canvas.canvasHalfSize.x),
      this.position.y - (this.canvas.cameraPosition.y - this.canvas.canvasHalfSize.y),
    );
    this.canvas.context.lineTo(
      target.x - (this.canvas.cameraPosition.x - this.canvas.canvasHalfSize.x),
      target.y - (this.canvas.cameraPosition.y - this.canvas.canvasHalfSize.y),
    );
    this.canvas.context.stroke();
  }
}
