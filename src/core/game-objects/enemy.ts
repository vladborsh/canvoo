import { AbstractRenderedEntity } from '../canvas/rendered-entity/abstract-rendered-entity';
import { LineRenderedEntity } from '../canvas/rendered-entity/line-rendered-entity';
import { Sprite } from '../canvas/rendered-entity/sprite';
import { Vector } from '../interfaces/vector';
import { RectangleStateEntity } from '../state/state-entity/rectangle-state.entity';
import { Aiming } from './aiming';
import { Patrolling } from './patrolling';

export class Enemy {
  public stateEntity: RectangleStateEntity;
  public renderedEntity: AbstractRenderedEntity;
  public patrolling: Patrolling;
  public aiming: Aiming;

  constructor(
    public target: Vector,
    public position: Vector,
    public size: Vector,
    public renderSize: Vector,
    activationRange: number,
    image: HTMLImageElement,
    layer: number
  ) {
    this.stateEntity = new RectangleStateEntity((<any>window).state, position, size);
    this.renderedEntity = new Sprite(
      (<any>window).canvas,
      this.stateEntity.position,
      renderSize,
      image,
      layer
    );

    (<any>window).canvas.addEntity(this.renderedEntity);
    (<any>window).state.addEntity(this.stateEntity);

    this.patrolling = new Patrolling(this.stateEntity.physicsState);
    this.aiming = new Aiming(this.target, this.position, activationRange);
  }

  public onActiveRange(callback: (position: Vector, target: Vector, angleToTarget: number) => void): void {
    this.aiming.onActiveRange((position, target, angleToTarget) => {
      callback(position, target, angleToTarget);
      this.patrolling.deactivate();
    });
  }

  public onOutActiveRange(callback: (position: Vector) => void): void {
    this.aiming.onOutActiveRange((position) => {
      callback(position);
      this.patrolling.activate();
    });
  }
}
