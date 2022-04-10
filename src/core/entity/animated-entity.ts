import { Sprite } from '../canvas/rendered-entity/sprite';
import { Vector } from '../interfaces/vector';
import { AbstractStateEntity } from '../state/state-entity/abstract-state-entity';
import { AbstractEntity } from './abstract-entity';

export class AnimatedEntity extends AbstractEntity {
  constructor(
    position: Vector,
    size: Vector,
    animationLength: number,
    frameDuration: number,
    image: HTMLImageElement,
    isBoomerang = false
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
      animationLength,
      frameDuration,
      image,
      isBoomerang
    );
    this.onUpdate(() => {});
  }
}
