import { Sprite } from '../canvas/rendered-entity/sprite';
import { AbstractEntity } from '../entity/abstract-entity';
import { ParticleSource } from '../entity/particle-source';
import { Vector } from '../interfaces/vector';
import { AbstractStateEntity } from '../state/state-entity/abstract-state-entity';
import { multiply, sum } from '../utils/calc';

export class Missile extends AbstractEntity {
  public velocity: Vector;
  private currentAngle: number = 0;
  private ANGLE_VELOCITY;
  private angleContainer = { alpha: 0 };
  private fireTail: ParticleSource;

  constructor(
    public target: Vector,
    public position: Vector,
    public size: Vector,
    public renderSize: Vector,
    public velocityMagnitude: number,
    image: HTMLImageElement,
    layer: number
  ) {
    super(position, size);
    this.ANGLE_VELOCITY = velocityMagnitude / 50;
    this.velocity = {
      x: this.velocityMagnitude * Math.cos(this.currentAngle),
      y: this.velocityMagnitude * Math.sin(this.currentAngle),
    };
    this.setVelocity();
    this.currentAngle = this.getTargetAngle();
    this.stateEntity = new AbstractStateEntity((<any>window).state, position, size);
    this.renderedEntity = new Sprite(
      (<any>window).canvas,
      this.stateEntity,
      renderSize,
      image,
      layer,
      this.angleContainer
    );

    this.fireTail = new ParticleSource(
      this.stateEntity.position,
      { x: 7, y: 7 },
      { x: 0, y: 0 },
      '#ffffff',
      true,
      20,
      true,
      10,
      1,
      '#ffee88',
    );

    (<any>window).canvas.addEntity(this.renderedEntity);
    (<any>window).state.addEntity(this.stateEntity);
    this.stateEntity.onUpdate((dt, stateEntity) => this.update(dt, stateEntity));
  }

  public update(dt: number, stateEntity: AbstractStateEntity): void {
    this.setVelocity();

    const dPosition = sum(stateEntity.position, multiply(this.velocity, dt / 100));
    this.position.x += dPosition.x;
    this.position.y += dPosition.y;
    stateEntity.position.x = dPosition.x;
    stateEntity.position.y = dPosition.y;

    /* for render */
    this.angleContainer.alpha = this.currentAngle;

    this.fireTail.velocity.x = -this.velocity.x;
    this.fireTail.velocity.y = -this.velocity.y;
  }

  private setVelocity(): void {
    this.currentAngle = this.getTargetAngle();

    const newVelocityVec = {
      x: this.velocityMagnitude * Math.cos(this.currentAngle),
      y: this.velocityMagnitude * Math.sin(this.currentAngle),
    };

    this.velocity.x +=
      this.velocity.x < newVelocityVec.x ? this.ANGLE_VELOCITY : -this.ANGLE_VELOCITY;
    this.velocity.y +=
      this.velocity.y < newVelocityVec.y ? this.ANGLE_VELOCITY : -this.ANGLE_VELOCITY;

  }

  private getTargetAngle(): number {
    return Math.atan2(this.target.y - this.position.y, this.target.x - this.position.x);
  }
}
