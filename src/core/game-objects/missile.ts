import { AbstractRenderedEntity } from '../canvas/rendered-entity/abstract-rendered-entity';
import { Sprite } from '../canvas/rendered-entity/sprite';
import { ParticleSource } from '../entity/particle-source';
import { Vector } from '../interfaces/vector';
import { AbstractStateEntity } from '../state/state-entity/abstract-state-entity';
import { RectangleStateEntity } from '../state/state-entity/rectangle-state.entity';
import { multiply, sum } from '../utils/calc';

export class Missile {
  public velocity: Vector;
  public stateEntity: AbstractStateEntity;
  public renderedEntity: AbstractRenderedEntity;
  private currentAngle: number = 0;
  private angleChangeVelocity;
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
    this.angleChangeVelocity = velocityMagnitude / 50;
    this.velocity = {
      x: this.velocityMagnitude * Math.cos(this.currentAngle),
      y: this.velocityMagnitude * Math.sin(this.currentAngle),
    };
    this.setVelocity();
    this.currentAngle = this.getTargetAngle();
    this.stateEntity = new RectangleStateEntity((<any>window).state, position, size);
    this.renderedEntity = new Sprite(
      (<any>window).canvas,
      this.stateEntity.position,
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
      layer,
      20,
      '#ffee88'
    );

    (<any>window).canvas.addEntity(this.renderedEntity);
    (<any>window).state.addEntity(this.stateEntity);
    this.stateEntity.update = (dt, stateEntity) => this.update(dt, stateEntity);
  }

  public update(dt: number, stateEntity: AbstractStateEntity): void {
    this.currentAngle = this.getTargetAngle();
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
    const newVelocityVec = {
      x: this.velocityMagnitude * Math.cos(this.currentAngle),
      y: this.velocityMagnitude * Math.sin(this.currentAngle),
    };

    this.velocity.x +=
      this.velocity.x < newVelocityVec.x
        ? this.angleChangeVelocity
        : -this.angleChangeVelocity;
    this.velocity.y +=
      this.velocity.y < newVelocityVec.y
        ? this.angleChangeVelocity
        : -this.angleChangeVelocity;
  }

  private getTargetAngle(): number {
    return Math.atan2(this.target.y - this.position.y, this.target.x - this.position.x);
  }
}
