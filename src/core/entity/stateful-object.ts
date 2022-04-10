import { Canvas } from '../canvas/canvas';
import { Sprite } from '../canvas/rendered-entity/sprite';
import { Vector } from '../interfaces/vector';
import { StateController } from '../state/state-controller';
import { AbstractStateEntity } from '../state/state-entity/abstract-state-entity';
import { AbstractEntity } from './abstract-entity';

interface AnimatedEntityBlueprint {
  animationLength: number;
  frameDuration: number;
  image: HTMLImageElement;
  isBoomerang: boolean;
}

export class StatefulObject extends AbstractEntity {
  public stateStore: Record<string, Sprite>;
  public activeStateName: string;
  public activeState: Sprite;
  public update: (dt: number, stateEntity: AbstractStateEntity) => void;

  constructor(
    position: Vector,
    size: Vector,
    private state: StateController,
    private canvas: Canvas,
    states: Record<string, AnimatedEntityBlueprint>,
    defaultState: string,
  ) {
    super(position, size);
    this.stateEntity = new AbstractStateEntity(
      (<any>window).state,
      position,
      size
    );
    this.stateStore = Object.entries(states).reduce(
      (acc, [key, blueprint]) => ({
        ...acc,
        [key]: new Sprite(
          canvas,
          this.stateEntity,
          size,
          blueprint.animationLength,
          blueprint.frameDuration,
          blueprint.image,
          blueprint.isBoomerang
        )
      }),
      {}
    );
    this.activeStateName = defaultState;
    this.activeState = this.stateStore[defaultState];
    this.state.addEntity(this.stateEntity);
    this.canvas.addEntity(this.activeState);
    this.renderedEntity = this.activeState;
  }

  public changeState(newState: string): void {
    if (newState !== this.activeStateName && !!this.stateStore[newState]) {
      this.canvas.destroy(this.activeState.id);

      this.activeStateName = newState;
      this.activeState = this.stateStore[newState];
      this.canvas.addEntity(this.activeState);
      this.renderedEntity = this.activeState;
    }
  }
}