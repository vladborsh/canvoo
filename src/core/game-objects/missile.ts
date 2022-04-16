import { Sprite } from "../canvas/rendered-entity/sprite";
import { AbstractEntity } from "../entity/abstract-entity";
import { Vector } from "../interfaces/vector";
import { AbstractStateEntity } from "../state/state-entity/abstract-state-entity";

export class Missile extends AbstractEntity {
  public velocity: Vector;
  private currentAngle: number = 0;
  private ANGLE_VELOCITY;
  private angleContainer = { alpha: 0 };

  constructor(
    public target: Vector,
    public position: Vector,
    public size: Vector,
    public renderSize: Vector,
    public velocityMagnitude: number,
    image: HTMLImageElement,
    layer: number,
    ) {
    super(position, size);
    this.ANGLE_VELOCITY = velocityMagnitude/50;
    this.velocity = {
      x: this.velocityMagnitude * Math.cos(this.currentAngle),
      y: this.velocityMagnitude * Math.sin(this.currentAngle),
    }
    this.setVelocity();
    this.currentAngle = this.getTargetAngle();
    this.stateEntity = new AbstractStateEntity((<any>window).state, position, size);
    this.renderedEntity = new Sprite(
      (<any>window).canvas,
      this.stateEntity,
      renderSize,
      image,
      layer,
      this.angleContainer,
    );

    (<any>window).canvas.addEntity(this.renderedEntity);
    (<any>window).state.addEntity(this.stateEntity);
    this.stateEntity.onUpdate(() => this.update());
  }

  public update(): void {
    this.setVelocity();

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }

  private setVelocity(): void {
    this.currentAngle = this.getTargetAngle();

    const newVelocityVec = {
      x: this.velocityMagnitude * Math.cos(this.currentAngle),
      y: this.velocityMagnitude * Math.sin(this.currentAngle),
    };

    this.velocity.x += this.velocity.x < newVelocityVec.x ? this.ANGLE_VELOCITY : -this.ANGLE_VELOCITY;
    this.velocity.y += this.velocity.y < newVelocityVec.y ? this.ANGLE_VELOCITY : -this.ANGLE_VELOCITY;

    /* for render */
    this.angleContainer.alpha = this.currentAngle;

  }

  private getTargetAngle(): number {
    return Math.atan2(
      this.target.y - this.position.y,
      this.target.x - this.position.x
    )
  }
}
