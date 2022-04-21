import { AbstractRenderedEntity } from '../canvas/rendered-entity/abstract-rendered-entity';
import { LineRenderedEntity } from '../canvas/rendered-entity/line-rendered-entity';
import { Sprite } from '../canvas/rendered-entity/sprite';
import { Vector } from '../interfaces/vector';
import { AbstractStateEntity } from '../state/state-entity/abstract-state-entity';
import { RectangleStateEntity } from '../state/state-entity/rectangle-state.entity';

const FIELD_OF_VIEW = Math.PI / 6;
const ANGLE_CHANGE_VELOCITY = Math.PI / 100;
const ALLOWED_INACCURACY = Math.PI / 100;

export class Enemy {
  private angleContainer = { alpha: 0 };
  private currentAngle: number = 0;
  private currentAngleToTarget: number = 0;
  public velocity: Vector;
  private currentFieldOfView = { bottomAngle: 0, upAngle: 0 };
  public stateEntity: RectangleStateEntity;
  public renderedEntity: AbstractRenderedEntity;

  constructor(
    public target: Vector,
    public position: Vector,
    public size: Vector,
    public renderSize: Vector,
    image: HTMLImageElement,
    layer: number
  ) {
    this.currentAngleToTarget = this.getTargetAngle();
    this.currentAngle = this.currentAngleToTarget;
    this.stateEntity = new RectangleStateEntity((<any>window).state, position, size);
    this.renderedEntity = new Sprite(
      (<any>window).canvas,
      this.stateEntity.position,
      renderSize,
      image,
      layer
    );
    const lineRenderedEntity = new LineRenderedEntity(
      (<any>window).canvas,
      this.position,
      '#55ff99',
      10,
      300,
      this.angleContainer
    );
    (<any>window).canvas.addEntity(this.renderedEntity);
    (<any>window).canvas.addEntity(lineRenderedEntity);
    (<any>window).state.addEntity(this.stateEntity);
  }

  public findTarget(): void {
    this.currentAngleToTarget = this.getTargetAngle();
    this.currentAngle = this.adjustCurrentAngle();
    this.currentFieldOfView.bottomAngle = this.currentAngle - FIELD_OF_VIEW;
    this.currentFieldOfView.upAngle = this.currentAngle + FIELD_OF_VIEW;
    this.angleContainer.alpha = this.currentAngle;
  }

  private getTargetAngle(): number {
    return Math.atan2(this.target.y - this.position.y, this.target.x - this.position.x);
  }

  private adjustCurrentAngle(): number {
    const diff =
      this.currentAngle > this.currentAngleToTarget
        ? -ANGLE_CHANGE_VELOCITY
        : ANGLE_CHANGE_VELOCITY;

    const newAngle = this.currentAngle + diff;

    return Math.abs(this.currentAngleToTarget - newAngle) > ALLOWED_INACCURACY
      ? newAngle
      : this.currentAngleToTarget;
  }
}
