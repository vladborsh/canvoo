import { AbstractRenderedEntity } from '../canvas/rendered-entity/abstract-rendered-entity';
import { Sprite } from '../canvas/rendered-entity/sprite';
import { Vector } from '../interfaces/vector';
import { AbstractStateEntity } from '../state/state-entity/abstract-state-entity';
import { RectangleStateEntity } from '../state/state-entity/rectangle-state.entity';

export class SpriteEntity {
  public stateEntity: AbstractStateEntity;
  public renderedEntity: AbstractRenderedEntity;

  constructor(
    position: Vector,
    size: Vector,
    image: HTMLImageElement,
    layer: number,
  ) {
    this.stateEntity = new RectangleStateEntity(
      (<any>window).state,
      position,
      size
    );
    this.renderedEntity = new Sprite(
      (<any>window).canvas,
      this.stateEntity.position,
      size,
      image,
      layer,
    );
    (<any>window).canvas.addEntity(this.renderedEntity);
    (<any>window).state.addEntity(this.stateEntity);
  }
}
