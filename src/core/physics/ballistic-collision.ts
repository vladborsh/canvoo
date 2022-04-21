import { Block } from "../interfaces/block";
import { Vector } from "../interfaces/vector";
import { AbstractStateEntity } from "../state/state-entity/abstract-state-entity";
import { PhysicsState } from "../state/state-entity/physics-state";

export class BallisticCollision {
  constructor(
    private readonly FREE_ACCELERATION: number,
    private readonly MAXIMUM_VELOCITY: Vector,
    private readonly FRICTION: number,
  ) {}

  public track(stateEntity: PhysicsState, blocks: Block[], dt: number) {
    let untouchedGroundWalls = 0;
    let untouchedLeftWalls = 0;
    let untouchedRightWalls = 0;

    for (let platform of blocks) {
      /* ground */
      if (
        stateEntity.velocity.y > 0 &&
        stateEntity.position.y < platform.position.y &&
        stateEntity.position.y + stateEntity.size.y > platform.position.y &&
        stateEntity.position.x < platform.position.x + platform.size.x &&
        stateEntity.position.x + stateEntity.size.x > platform.position.x
      ) {
        const dy = Math.max(stateEntity.position.y, platform.position.y) -
          Math.min(stateEntity.position.y + stateEntity.size.y , platform.position.y + platform.size.y);
        const dx = Math.min(stateEntity.position.x + stateEntity.size.x, platform.position.x + platform.size.x) -
          Math.max(stateEntity.position.x, platform.position.x);
        if (Math.abs(dx) > Math.abs(dy)) {
          stateEntity.velocity.y = 0;
          stateEntity.position.y = platform.position.y - stateEntity.size.y - 1;
          stateEntity.onGround = true;
          stateEntity.spaceBottom = false;
        }
      }

      if (
        stateEntity.onGround &&
        !(
          stateEntity.position.y + 2 < platform.position.y &&
          stateEntity.position.y + 2 + stateEntity.size.y > platform.position.y &&
          stateEntity.position.x < platform.position.x + platform.size.x &&
          stateEntity.position.x + stateEntity.size.x > platform.position.x
        )
      ) {
        untouchedGroundWalls++;

        if (untouchedGroundWalls === blocks.length) {
          stateEntity.onGround = false;
        }
      }

      /* left wall */
      if (
        stateEntity.velocity.x < 0 &&
        stateEntity.position.x < platform.position.x + platform.size.x &&
        stateEntity.position.x + stateEntity.size.x > platform.position.x + platform.size.x &&
        stateEntity.position.y < platform.position.y + platform.size.y &&
        stateEntity.position.y + stateEntity.size.y > platform.position.y
      ) {
        const dy = Math.max(stateEntity.position.y, platform.position.y) -
          Math.min(stateEntity.position.y + stateEntity.size.y , platform.position.y + platform.size.y);
        const dx = Math.min(stateEntity.position.x + stateEntity.size.x, platform.position.x + platform.size.x) -
          Math.max(stateEntity.position.x, platform.position.x);
        if (Math.abs(dx) < Math.abs(dy)) {
          stateEntity.leftWall = true;
          stateEntity.position.x = platform.position.x + platform.size.x + 1;
          stateEntity.velocity.x = 0;
        }
      }

      if (
        stateEntity.leftWall &&
        !(
          stateEntity.position.x - 2 < platform.position.x + platform.size.x &&
          stateEntity.position.x - 2 + stateEntity.size.x > platform.position.x + platform.size.x &&
          stateEntity.position.y < platform.position.y + platform.size.y &&
          stateEntity.position.y + stateEntity.size.y > platform.position.y
        )
      ) {
        untouchedLeftWalls++;

        if (untouchedLeftWalls === blocks.length) {
          stateEntity.leftWall = false;
        }
      }

      /* right wall */
      if (
        stateEntity.velocity.x > 0 &&
        stateEntity.position.x + stateEntity.size.x > platform.position.x &&
        stateEntity.position.x < platform.position.x &&
        stateEntity.position.y < platform.position.y + platform.size.y &&
        stateEntity.position.y + stateEntity.size.y > platform.position.y
      ) {
        const dy = Math.max(stateEntity.position.y, platform.position.y) -
          Math.min(stateEntity.position.y + stateEntity.size.y , platform.position.y + platform.size.y);
        const dx = Math.min(stateEntity.position.x + stateEntity.size.x, platform.position.x + platform.size.x) -
          Math.max(stateEntity.position.x, platform.position.x);
        if (Math.abs(dx) < Math.abs(dy)) {
          stateEntity.rightWall = true;
          stateEntity.position.x = platform.position.x - platform.size.x - 1;
          stateEntity.velocity.x = 0;
        }
      }

      if (
        stateEntity.rightWall &&
        !(
          stateEntity.position.x + stateEntity.size.x + 2 > platform.position.x &&
          stateEntity.position.x + 2 < platform.position.x &&
          stateEntity.position.y < platform.position.y + platform.size.y &&
          stateEntity.position.y + stateEntity.size.y > platform.position.y
        )
      ) {
        untouchedRightWalls++;

        if (untouchedRightWalls === blocks.length) {
          stateEntity.rightWall = false;
        }
      }

      /* ceil */
      if (
        stateEntity.velocity.y < 0 &&
        stateEntity.position.y < platform.position.y + platform.size.y  &&
        stateEntity.position.y + stateEntity.size.y > platform.position.y &&
        stateEntity.position.x < platform.position.x + platform.size.x &&
        stateEntity.position.x + stateEntity.size.x > platform.position.x
      ) {
        const dy = Math.max(stateEntity.position.y, platform.position.y) -
          Math.min(stateEntity.position.y + stateEntity.size.y , platform.position.y + platform.size.y);
        const dx = Math.min(stateEntity.position.x + stateEntity.size.x, platform.position.x + platform.size.x) -
          Math.max(stateEntity.position.x, platform.position.x);
        if (Math.abs(dx) > Math.abs(dy)) {
          stateEntity.velocity.y = 0;
          stateEntity.acceleration.y = 0;
          stateEntity.position.y = platform.position.y + stateEntity.size.y + 1;
        }
      }
    }

    if (!stateEntity.onGround || Math.abs(stateEntity.velocity.y)) {
      stateEntity.velocity.y = stateEntity.velocity.y + this.FREE_ACCELERATION * (dt / 500);
    }

    if (stateEntity.velocity.y < -this.MAXIMUM_VELOCITY.y && Math.abs(stateEntity.acceleration.y) > 0) {
      stateEntity.acceleration.y = 0;
    }

    if (Math.abs(stateEntity.velocity.x)) {
      if (stateEntity.velocity.x < 0) {
        stateEntity.velocity.x = stateEntity.velocity.x + this.FRICTION * (dt / 100);
      }
      if (stateEntity.velocity.x > 0) {
        stateEntity.velocity.x = stateEntity.velocity.x - this.FRICTION * (dt / 100);
      }
    }

    if (Math.abs(stateEntity.velocity.x) < 1) {
      stateEntity.velocity.x = 0;
    }

    if (Math.abs(stateEntity.velocity.x) > this.MAXIMUM_VELOCITY.x) {
      if (stateEntity.velocity.x < 0) {
        stateEntity.velocity.x = -this.MAXIMUM_VELOCITY.x;
      }
      if (stateEntity.velocity.x > 0) {
        stateEntity.velocity.x = this.MAXIMUM_VELOCITY.x;
      }
    }
  }
}
