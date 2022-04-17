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
    private shadow?: string,
  ) {
    super(canvas, size, layer);
    this.onRender(() => this.draw());
  }

  public draw() {
    console.log(this.shadow)
    if (this.shadow) {
      this.canvas.context.shadowColor = this.shadow;
      this.canvas.context.shadowBlur = 6;
    }
    this.canvas.context.fillStyle = this.color;
    this.canvas.context.fillRect(
      this.position.x - (this.canvas.cameraPosition.x - this.canvas.canvasHalfSize.x),
      this.position.y - (this.canvas.cameraPosition.y - this.canvas.canvasHalfSize.y),
      this.size.x,
      this.size.y
    );
    this.canvas.context.shadowBlur = 0;
  }
}
