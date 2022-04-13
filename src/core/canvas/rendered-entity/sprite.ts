import { Vector } from 'src/core/interfaces/vector';
import { AbstractStateEntity } from 'src/core/state/state-entity/abstract-state-entity';
import { Canvas } from '../canvas';
import { AbstractRenderedEntity } from './abstract-rendered-entity';

export class Sprite extends AbstractRenderedEntity {
  constructor(
    public canvas: Canvas,
    private stateEntity: AbstractStateEntity,
    private size: Vector,
    private image: HTMLImageElement,
    public layer: number,
  ) {
    super(canvas, layer);
  }

  public render() {
    /* this.canvas.context.drawImage(
      this.image,
      this.stateEntity.position.x,
      this.stateEntity.position.y,
      this.size.x,
      this.size.y
    ); */

    this.canvas.context.drawImage(
      this.image,
      this.stateEntity.position.x - (this.canvas.cameraPosition.x - this.canvas.canvasHalfSize.x),
      this.stateEntity.position.y - (this.canvas.cameraPosition.y - this.canvas.canvasHalfSize.y),
      this.size.x,
      this.size.y
    );
  }
}
