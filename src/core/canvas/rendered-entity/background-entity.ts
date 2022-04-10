import { AbstractRenderedEntity } from './abstract-rendered-entity';
import { Canvas } from '../canvas';

export class BackgroundEntity extends AbstractRenderedEntity {
  constructor(canvas: Canvas, public color: string) {
    super(canvas, 0);
  }

  public render() {
    this.canvas.context.fillStyle = this.color;
    this.canvas.context.fillRect(
      0,
      0,
      this.canvas.canvas.width,
      this.canvas.canvas.height
    );
  }
}
