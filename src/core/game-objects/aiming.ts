import { Vector } from "../interfaces/vector";

const ANGLE_CHANGE_VELOCITY = Math.PI / 200;
const ALLOWED_INACCURACY = Math.PI / 100;

export class Aiming {
  public alpha: number = 0;
  private currentAngleToTarget: number = 0;
  public isAiming: boolean;

  private onActiveRangeCb: (position: Vector, target: Vector, angleToTarget: number) => void;
  private onOutActiveRangeCb: (position: Vector) => void;

  constructor(
    public target: Vector,
    public position: Vector,
    public activationRange?: number,
  ) {}

  public onActiveRange(callback: (position: Vector, target: Vector, angleToTarget: number) => void): void {
    this.onActiveRangeCb = callback;
  }

  public onOutActiveRange(callback: (position: Vector) => void): void {
    this.onOutActiveRangeCb = callback;
  }

  public aim(): void {
    if (!this.activationRange || (this.getTargetDistance() < this.activationRange)) {
      this.currentAngleToTarget = this.getTargetAngle();
      this.alpha = this.adjustCurrentAngle();
      this.isAiming = true;
      if (this.onActiveRangeCb) {
        this.onActiveRangeCb(this.position, this.target, this.currentAngleToTarget);
      }
    } else {
      if (this.isAiming && this.onOutActiveRangeCb) {
        this.onOutActiveRangeCb(this.position);
      }
      this.isAiming = false;
    }
  }

  private adjustCurrentAngle(): number {
    let angleDelta =
      this.alpha > this.currentAngleToTarget
        ? -ANGLE_CHANGE_VELOCITY
        : ANGLE_CHANGE_VELOCITY;

    if (this.isFrom2to3Quadrant() || this.isFrom3to2Quadrant()) {
      angleDelta = -angleDelta;
    }

    let newAngle = this.alpha + angleDelta;

    if (newAngle < -Math.PI) {
      newAngle = Math.PI - ANGLE_CHANGE_VELOCITY;
    }

    if (newAngle > Math.PI) {
      newAngle = -Math.PI + ANGLE_CHANGE_VELOCITY;
    }

    return Math.abs(this.currentAngleToTarget - newAngle) > ALLOWED_INACCURACY
      ? newAngle
      : this.currentAngleToTarget;
  }

  private isFrom2to3Quadrant(): boolean {
    return (this.alpha < -Math.PI/2 && this.alpha > -Math.PI
      && this.currentAngleToTarget > Math.PI/2 && this.currentAngleToTarget < Math.PI)
  }

  private isFrom3to2Quadrant(): boolean {
    return (this.currentAngleToTarget < -Math.PI/2 && this.currentAngleToTarget > -Math.PI
      && this.alpha > Math.PI/2 && this.alpha < Math.PI)
  }

  private getTargetDistance(): number {
    return Math.sqrt(Math.pow(this.target.y - this.position.y, 2) + Math.pow(this.target.x - this.position.x, 2));
  }

  private getTargetAngle(): number {
    return Math.atan2(this.target.y - this.position.y, this.target.x - this.position.x);
  }
}
