import { RectangleRenderedEntity } from '../canvas/rendered-entity/rectangle-rendered-entity';
import { AbstractEntity } from '../entity/abstract-entity';
import { Vector } from '../interfaces/vector';
import { AbstractStateEntity } from '../state/state-entity/abstract-state-entity';

const BULLET_VELOCITY_DIFF = 0.7;

export class Bullet extends AbstractEntity {
  public velocity: Vector;
  private currentAngle: number = 0;
  private angleContainer = { alpha: 0 };

  constructor(
    public target: Vector,
    public position: Vector,
    public size: Vector,
    public velocityMagnitude: number,
    layer: number,
    color: string,
    shadow?: string
  ) {
    super(position, size);
    console.log(target);
    this.currentAngle = this.getTargetAngle();
    this.angleContainer.alpha = this.currentAngle;
    this.velocity = {
      x: this.velocityMagnitude * Math.cos(this.currentAngle) + this.getRandomVelDiff(),
      y: this.velocityMagnitude * Math.sin(this.currentAngle) + this.getRandomVelDiff(),
    };
    this.stateEntity = new AbstractStateEntity((<any>window).state, position, size);
    this.renderedEntity = new RectangleRenderedEntity(
      (<any>window).canvas,
      color,
      size,
      this.stateEntity.position,
      layer,
      shadow,
      this.angleContainer,
    );

    (<any>window).canvas.addEntity(this.renderedEntity);
    (<any>window).state.addEntity(this.stateEntity);
    this.stateEntity.onUpdate(() => this.update());
  }

  public update(): void {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }

  private getTargetAngle(): number {
    return Math.atan2(this.target.y - this.position.y, this.target.x - this.position.x);
  }

  private getRandomVelDiff(): number {
    const sign = Math.random() > 0.5 ? 1 : -1;
    return sign * Math.random() * BULLET_VELOCITY_DIFF;
  }
}
