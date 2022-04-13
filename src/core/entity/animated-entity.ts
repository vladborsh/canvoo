import { AnimationSprite } from '../canvas/rendered-entity/animation-sprite';
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
    layer: number,
    isBoomerang = false,
    withBoundingBox = false,
  ) {
    super(position, size);
    this.stateEntity = new AbstractStateEntity(
      (<any>window).state,
      position,
      size
    );
    this.renderedEntity = new AnimationSprite(
      (<any>window).canvas,
      this.stateEntity,
      size,
      animationLength,
      frameDuration,
      image,
      layer,
      isBoomerang,
      withBoundingBox,
    );
    (<any>window).canvas.addEntity(this.renderedEntity);
    (<any>window).state.addEntity(this.stateEntity);
    this.onUpdate(() => {});
  }
}
