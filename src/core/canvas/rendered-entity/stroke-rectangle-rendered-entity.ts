import { AbstractRenderedEntity } from './abstract-rendered-entity';
import { Vector } from '../../interfaces/vector';
import { Canvas } from '../canvas';

export class StrokeRectangleRenderedEntity implements AbstractRenderedEntity {
  private halfSize: Vector;
  public isActive = true;

  constructor(
    public canvas: Canvas,
    public color: string,
    public size: Vector,
    public position: Vector,
    public layer: number,
    private angle?: { alpha: number }
  ) {
    this.halfSize = {
      x: size.x / 2,
      y: size.y / 2,
    };
  }

  public render() {
    this.canvas.context.fillStyle = this.color;

    if (!this.angle) {
      this.drawRectWithShift();
    } else {
      this.canvas.context.save();
      this.canvas.context.translate(
        this.position.x - (this.canvas.cameraPosition.x - this.canvas.canvasHalfSize.x),
        this.position.y - (this.canvas.cameraPosition.y - this.canvas.canvasHalfSize.y)
      );
      this.canvas.context.rotate(this.angle.alpha);
      this.drawRect();
      this.canvas.context.restore();
    }

    this.canvas.context.shadowBlur = 0;
  }

  private drawRectWithShift(): void {
    this.canvas.context.strokeRect(
      this.position.x -
        (this.canvas.cameraPosition.x - this.canvas.canvasHalfSize.x) -
        this.halfSize.x,
      this.position.y -
        (this.canvas.cameraPosition.y - this.canvas.canvasHalfSize.y) -
        this.halfSize.y,
      this.size.x,
      this.size.y
    );
  }

  private drawRect(): void {
    this.canvas.context.strokeRect(
      -this.halfSize.x,
      -this.halfSize.y,
      this.size.x,
      this.size.y
    );
  }
}
