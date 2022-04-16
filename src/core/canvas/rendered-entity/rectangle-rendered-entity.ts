import { AbstractRenderedEntity } from './abstract-rendered-entity';
import { Vector } from '../../interfaces/vector';
import { Canvas } from '../canvas';
import { AbstractStateEntity } from '../../state/state-entity/abstract-state-entity';

export class RectangleRenderedEntity extends AbstractRenderedEntity {
  constructor(
    canvas: Canvas,
    public color: string,
    public size: Vector,
    public stateEntity: AbstractStateEntity,
    public layer: number,
  ) {
    super(canvas, layer);
  }

  public render() {
    this.canvas.context.fillStyle = this.color;
    this.canvas.context.fillRect(
      this.stateEntity.position.x - (this.canvas.cameraPosition.x - this.canvas.canvasHalfSize.x),
      this.stateEntity.position.y - (this.canvas.cameraPosition.y - this.canvas.canvasHalfSize.y),
      this.size.x,
      this.size.y
    );
  }
}
