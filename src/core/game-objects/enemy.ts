import { AbstractRenderedEntity } from '../canvas/rendered-entity/abstract-rendered-entity';
import { LineRenderedEntity } from '../canvas/rendered-entity/line-rendered-entity';
import { Sprite } from '../canvas/rendered-entity/sprite';
import { Collider } from '../interfaces/collider';
import { Vector } from '../interfaces/vector';
import { RectangleStateEntity } from '../state/state-entity/rectangle-state.entity';

const FIELD_OF_VIEW = Math.PI / 6;
const ANGLE_CHANGE_VELOCITY = Math.PI / 200;
const ALLOWED_INACCURACY = Math.PI / 100;

const MOVE_ACCELERATION = 5;

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

    // DRAFT: SET MOVING
    this.stateEntity.physicsState.acceleration.x = MOVE_ACCELERATION;
  }

  public findTarget(): void {
    this.currentAngleToTarget = this.getTargetAngle();
    this.currentAngle = this.adjustCurrentAngle();
    this.currentFieldOfView.bottomAngle = this.currentAngle - FIELD_OF_VIEW;
    this.currentFieldOfView.upAngle = this.currentAngle + FIELD_OF_VIEW;
    this.angleContainer.alpha = this.currentAngle;
  }

  public horizontalPatrolling(tiles: Collider[]): void {
    if(this.stateEntity.physicsState.onGround) {
      if (this.stateEntity.physicsState.rightWall) {
        this.stateEntity.physicsState.acceleration.x = -MOVE_ACCELERATION;
        this.stateEntity.physicsState.velocity.x = this.stateEntity.physicsState.acceleration.x;
        this.stateEntity.physicsState.rightWall = false;
        return;
      }

      if (this.stateEntity.physicsState.leftWall) {
        this.stateEntity.physicsState.acceleration.x = MOVE_ACCELERATION;
        this.stateEntity.physicsState.velocity.x = this.stateEntity.physicsState.acceleration.x;
        this.stateEntity.physicsState.leftWall = false;
        return;
      }

      let isBottomRightTileExists = false;
      let isBottomLeftTileExists = false;

      for (let tile of tiles) {
        if ((this.stateEntity.position.x > tile.position.x)
          && (this.stateEntity.position.x < tile.position.x + tile.size.x)
          && (this.stateEntity.position.y + this.stateEntity.size.y + 2 >= tile.position.y)
          && (this.stateEntity.position.y + this.stateEntity.size.y < tile.position.y + tile.size.y)
        ) {
          isBottomLeftTileExists = true;
        }

        if ((this.stateEntity.position.x + this.stateEntity.size.x < tile.position.x + tile.size.x)
          && (this.stateEntity.position.x + this.stateEntity.size.x > tile.position.x)
          && (this.stateEntity.position.y + this.stateEntity.size.y + 2 >= tile.position.y)
          && (this.stateEntity.position.y + this.stateEntity.size.y < tile.position.y + tile.size.y)
        ) {
          isBottomRightTileExists = true;
        }
      }

      if (!isBottomRightTileExists) {
        this.stateEntity.physicsState.acceleration.x = -MOVE_ACCELERATION;
        this.stateEntity.physicsState.velocity.x = this.stateEntity.physicsState.acceleration.x;
      }

      if (!isBottomLeftTileExists) {
        this.stateEntity.physicsState.acceleration.x = MOVE_ACCELERATION;
        this.stateEntity.physicsState.velocity.x = this.stateEntity.physicsState.acceleration.x;
      }
    }

  }

  private getTargetAngle(): number {
    return Math.atan2(this.target.y - this.position.y, this.target.x - this.position.x);
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
      newAngle = Math.PI-ANGLE_CHANGE_VELOCITY;
    }

    if (newAngle > Math.PI) {
      newAngle = -Math.PI+ANGLE_CHANGE_VELOCITY;
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
}
