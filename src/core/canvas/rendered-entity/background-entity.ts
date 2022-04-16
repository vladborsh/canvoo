import { AbstractRenderedEntity } from './abstract-rendered-entity';
import { Canvas } from '../canvas';

export class BackgroundEntity extends AbstractRenderedEntity {
  constructor(canvas: Canvas, public color: string) {
    super(canvas, {x: 0, y: 0}, 0);
    this.onRender(() => {
      this.draw();
    });
  }

  public draw() {
    this.canvas.context.fillStyle = this.color;
    this.canvas.context.fillRect(
      0,
      0,
      this.canvas.canvas.width,
      this.canvas.canvas.height
    );
  }
}
