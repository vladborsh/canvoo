import { AbstractRenderedEntity } from './abstract-rendered-entity';
import { Vector } from '../../interfaces/vector';
import { Canvas } from '../canvas';

export class RectangleRenderedEntity extends AbstractRenderedEntity {
  constructor(
    canvas: Canvas,
    public color: string,
    public size: Vector,
    public position: Vector,
    public layer: number,
  ) {
    super(canvas, size, layer);
    this.onRender(() => this.draw());
  }

  public draw() {
    this.canvas.context.fillStyle = this.color;
    this.canvas.context.fillRect(
      this.position.x - (this.canvas.cameraPosition.x - this.canvas.canvasHalfSize.x),
      this.position.y - (this.canvas.cameraPosition.y - this.canvas.canvasHalfSize.y),
      this.size.x,
      this.size.y
    );
  }
}
