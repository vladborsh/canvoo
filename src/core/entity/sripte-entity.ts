import { Sprite } from '../canvas/rendered-entity/sprite';
import { Vector } from '../interfaces/vector';
import { AbstractStateEntity } from '../state/state-entity/abstract-state-entity';
import { AbstractEntity } from './abstract-entity';

export class SpriteEntity extends AbstractEntity {
  constructor(
    position: Vector,
    size: Vector,
    image: HTMLImageElement,
  ) {
    super(position, size);
    this.stateEntity = new AbstractStateEntity(
      (<any>window).state,
      position,
      size
    );
    this.renderedEntity = new Sprite(
      (<any>window).canvas,
      this.stateEntity,
      size,
      image,
    );
    (<any>window).canvas.addEntity(this.renderedEntity);
    (<any>window).state.addEntity(this.stateEntity);
    this.stateEntity.onUpdate(() => {});
  }
}
