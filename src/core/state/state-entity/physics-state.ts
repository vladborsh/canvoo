import { Vector } from "../../interfaces/vector";
import { multiply, sum } from "../../utils/calc";

const FRICTION = 0.03;
const GRAVITY =  0.1;
const MAXIMUM_VELOCITY = { x: 40, y: 100 };

export class PhysicsState {
  public prevPosition: Vector;
  public position: Vector;
  public size: Vector;
  public velocity: Vector = { x: 0, y: 0 };
  public acceleration: Vector = { x: 0, y: 0 };
  public onGround = false;
  public spaceBottom = true;
  public leftWall = false;
  public rightWall = false;

  acceleratedMotion(dt: number): void {
    this.applyGravity(dt);
    this.applyFriction(dt);
    this.adjustMaximumVelocityX();
    this.adjustMaximumVelocityY();
    this.adjustMinVelocityX();

    this.prevPosition.x = this.position.x;
    this.prevPosition.y = this.position.y;

    const dVelocity = sum(this.velocity, multiply(this.acceleration, dt / 100));
    this.velocity.x = dVelocity.x;
    this.velocity.y = dVelocity.y;
    const dPosition = sum(this.position, multiply(this.velocity, dt / 100));
    this.position.x = dPosition.x;
    this.position.y = dPosition.y;
  }

  private applyGravity(dt: number): void {
    if (!this.onGround || Math.abs(this.velocity.y)) {
      this.velocity.y = this.velocity.y + GRAVITY * dt;
    }
  }

  private applyFriction(dt: number): void {
    if (Math.abs(this.velocity.x)) {
      if (this.velocity.x < 0) {
        this.velocity.x = this.velocity.x + FRICTION * dt;
      }
      if (this.velocity.x > 0) {
        this.velocity.x = this.velocity.x - FRICTION * dt;
      }
    }
  }

  private adjustMaximumVelocityY(): void {
    if (Math.abs(this.velocity.y) > MAXIMUM_VELOCITY.y) {
      if (this.velocity.y < 0) {
        this.velocity.y = -MAXIMUM_VELOCITY.y;
      }
      if (this.velocity.y > 0) {
        this.velocity.y = MAXIMUM_VELOCITY.y;
      }
    }
  }

  private adjustMaximumVelocityX(): void {
    if (Math.abs(this.velocity.x) > MAXIMUM_VELOCITY.x) {
      if (this.velocity.x < 0) {
        this.velocity.x = -MAXIMUM_VELOCITY.x;
      }
      if (this.velocity.x > 0) {
        this.velocity.x = MAXIMUM_VELOCITY.x;
      }
    }
  }

  private adjustMinVelocityX(): void {
    if (Math.abs(this.velocity.x) < 1) {
      this.velocity.x = 0;
    }
  }
}
