import { Vector } from '../interfaces/vector';
import { RectangleRenderedEntity } from '../canvas/rendered-entity/rectangle-rendered-entity';
import { AbstractStateEntity } from '../state/state-entity/abstract-state-entity';
import { AbstractRenderedEntity } from '../canvas/rendered-entity/abstract-rendered-entity';
import { RectangleStateEntity } from '../state/state-entity/rectangle-state.entity';

export class RectangleEntity {
  public stateEntity: RectangleStateEntity;
  public renderedEntity: AbstractRenderedEntity;

  constructor(
    position: Vector,
    size: Vector,
    layer: number,
    color: string,
    shadow?: string
  ) {
    this.stateEntity = new RectangleStateEntity(
      (<any>window).state.controlState,
      position,
      size
    );
    this.renderedEntity = new RectangleRenderedEntity(
      (<any>window).canvas,
      color,
      size,
      this.stateEntity.position,
      layer,
      shadow
    );

    (<any>window).canvas.addEntity(this.renderedEntity);
    (<any>window).state.addEntity(this.stateEntity);
  }
}
