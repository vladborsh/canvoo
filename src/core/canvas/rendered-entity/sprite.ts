import { Vector } from 'src/core/interfaces/vector';
import { AbstractStateEntity } from 'src/core/state/state-entity/abstract-state-entity';
import { Canvas } from '../canvas';
import { AbstractRenderedEntity } from './abstract-rendered-entity';

export class Sprite extends AbstractRenderedEntity {
  private halfSize: Vector;

  constructor(
    public canvas: Canvas,
    private stateEntity: AbstractStateEntity,
    public size: Vector,
    private image: HTMLImageElement,
    public layer: number,
    private angle?: { alpha: number }
  ) {
    super(canvas, size, layer);
    this.halfSize = {
      x: size.x / 2,
      y: size.y / 2,
    };
    this.onRender(() => this.draw());
  }

  public draw() {
    if (!this.angle) {
      this.drawImageWithShift();
      return;
    }

    this.canvas.context.save();
    this.canvas.context.translate(
      this.stateEntity.position.x -
        (this.canvas.cameraPosition.x - this.canvas.canvasHalfSize.x) +
        this.halfSize.x,
      this.stateEntity.position.y -
        (this.canvas.cameraPosition.y - this.canvas.canvasHalfSize.y) +
        this.halfSize.y
    );
    this.canvas.context.rotate(this.angle.alpha);
    this.drawImage();
    this.canvas.context.restore();
  }

  private drawImageWithShift(): void {
    this.canvas.context.drawImage(
      this.image,
      this.stateEntity.position.x -
        (this.canvas.cameraPosition.x - this.canvas.canvasHalfSize.x) -
        this.halfSize.x,
      this.stateEntity.position.y -
        (this.canvas.cameraPosition.y - this.canvas.canvasHalfSize.y) -
        this.halfSize.y,
      this.size.x,
      this.size.y
    );
  }

  private drawImage(): void {
    this.canvas.context.drawImage(this.image, 0, 0, this.size.x, this.size.y);
  }
}
