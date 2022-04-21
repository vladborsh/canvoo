import { AbstractRenderedEntity } from '../canvas/rendered-entity/abstract-rendered-entity';
import { AnimationSprite } from '../canvas/rendered-entity/animation-sprite';
import { Vector } from '../interfaces/vector';
import { AbstractStateEntity } from '../state/state-entity/abstract-state-entity';
import { RectangleStateEntity } from '../state/state-entity/rectangle-state.entity';

export class AnimatedEntity {
  public stateEntity: AbstractStateEntity;
  public renderedEntity: AbstractRenderedEntity;

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
    this.stateEntity = new RectangleStateEntity(
      (<any>window).state.controlState,
      position,
      size
    );
    this.renderedEntity = new AnimationSprite(
      (<any>window).canvas,
      this.stateEntity.position,
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
  }
}
