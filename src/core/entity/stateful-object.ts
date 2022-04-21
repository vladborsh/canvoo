import { Canvas } from '../canvas/canvas';
import { AbstractRenderedEntity } from '../canvas/rendered-entity/abstract-rendered-entity';
import { AnimationSprite } from '../canvas/rendered-entity/animation-sprite';
import { Vector } from '../interfaces/vector';
import { StateController } from '../state/state-controller';
import { AbstractStateEntity } from '../state/state-entity/abstract-state-entity';
import { RectangleStateEntity } from '../state/state-entity/rectangle-state.entity';

interface AnimatedEntityBlueprint {
  animationLength: number;
  frameDuration: number;
  image: HTMLImageElement;
  isBoomerang?: boolean;
  withBoundingBox?: boolean;
}

export class StatefulObject {
  public stateStore: Record<string, AnimationSprite>;
  public activeStateName: string;
  public activeState: AnimationSprite;
  public stateEntity: RectangleStateEntity;
  public renderedEntity: AbstractRenderedEntity;

  constructor(
    position: Vector,
    size: Vector,
    private state: StateController,
    private canvas: Canvas,
    states: Record<string, AnimatedEntityBlueprint>,
    defaultState: string,
    layer: number,
  ) {
    this.stateEntity = new RectangleStateEntity(
      (<any>window).state,
      position,
      {
        x: size.x - 1,
        y: size.y - 1,
      }
    );
    this.stateStore = Object.entries(states).reduce(
      (acc, [key, blueprint]) => ({
        ...acc,
        [key]: new AnimationSprite(
          canvas,
          this.stateEntity.position,
          size,
          blueprint.animationLength,
          blueprint.frameDuration,
          blueprint.image,
          layer,
          blueprint.isBoomerang,
          blueprint.withBoundingBox,
        )
      }),
      {}
    );
    Object.values(this.stateStore).forEach(animatedSprite => {
      animatedSprite.isActive = false;
      this.canvas.addEntity(animatedSprite);
    });
    this.activeStateName = defaultState;
    this.activeState = this.stateStore[defaultState];
    this.activeState.isActive = true;
    this.state.addEntity(this.stateEntity);
    this.renderedEntity = this.activeState;
  }

  public changeState(newState: string): void {
    if (newState !== this.activeStateName && !!this.stateStore[newState]) {
      this.activeState.isActive = false;
      this.activeStateName = newState;
      this.activeState = this.stateStore[newState];
      this.activeState.isActive = true;
      this.renderedEntity = this.activeState;
    }
  }
}
