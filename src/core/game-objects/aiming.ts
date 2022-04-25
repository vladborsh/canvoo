import { Vector } from "../interfaces/vector";

const ANGLE_CHANGE_VELOCITY = Math.PI / 200;
const ALLOWED_INACCURACY = Math.PI / 100;

export class Aiming {
  public currentAngle: number = 0;
  private currentAngleToTarget: number = 0;
  public isAiming: boolean;

  constructor(
    public target: Vector,
    public position: Vector,
    public activationRange?: number,
  ) {}

  public aim(): void {
    if (!this.activationRange || (this.getTargetDistance() < this.activationRange)) {
      this.currentAngleToTarget = this.getTargetAngle();
      this.currentAngle = this.adjustCurrentAngle();
      this.isAiming = true;
    } else {
      this.isAiming = false;
    }
  }

  private adjustCurrentAngle(): number {
    let angleDelta =
      this.currentAngle > this.currentAngleToTarget
        ? -ANGLE_CHANGE_VELOCITY
        : ANGLE_CHANGE_VELOCITY;

    if (this.isFrom2to3Quadrant() || this.isFrom3to2Quadrant()) {
      angleDelta = -angleDelta;
    }

    let newAngle = this.currentAngle + angleDelta;

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
    return (this.currentAngle < -Math.PI/2 && this.currentAngle > -Math.PI
      && this.currentAngleToTarget > Math.PI/2 && this.currentAngleToTarget < Math.PI)
  }

  private isFrom3to2Quadrant(): boolean {
    return (this.currentAngleToTarget < -Math.PI/2 && this.currentAngleToTarget > -Math.PI
      && this.currentAngle > Math.PI/2 && this.currentAngle < Math.PI)
  }

  private getTargetDistance(): number {
    return Math.sqrt(Math.pow(this.target.y - this.position.y, 2) + Math.pow(this.target.x - this.position.x, 2));
  }

  private getTargetAngle(): number {
    return Math.atan2(this.target.y - this.position.y, this.target.x - this.position.x);
  }
}
