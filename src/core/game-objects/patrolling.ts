import { Collider } from "../interfaces/collider";
import { PhysicsState } from "../state/state-entity/physics-state";

export class Patrolling {
  private isActive = true;

  constructor(
    public physicsState: PhysicsState,
    public MOVE_ACCELERATION = 3,
  ) {
    this.physicsState.acceleration.x = this.MOVE_ACCELERATION;
    this.physicsState.velocity.x += this.physicsState.acceleration.x;
  }

  public horizontalPatrol(tiles: Collider[]): void {
    if (!this.physicsState.onGround || !this.isActive) {
      if (!this.isActive) {
        this.physicsState.velocity.x = 0;
        this.physicsState.acceleration.x = 0;
      }
      return;
    }

    if (!this.physicsState.velocity.x && !this.physicsState.acceleration.x) {
      this.physicsState.acceleration.x = this.MOVE_ACCELERATION;
      this.physicsState.velocity.x += this.physicsState.acceleration.x;
    }

    const { isWallLeft, isWallRight } = this.checkSideWalls();

    const { isBottomLeftTile, isBottomRightTile } = !isWallLeft && !isWallRight ? this.checkTilesBottom(tiles) : this.getDefault();

    if (isWallRight || !isBottomRightTile) {
      this.physicsState.acceleration.x = -this.MOVE_ACCELERATION;
      this.physicsState.velocity.x += this.physicsState.acceleration.x;
    }

    if (isWallLeft || !isBottomLeftTile) {
      this.physicsState.acceleration.x = this.MOVE_ACCELERATION;
      this.physicsState.velocity.x += this.physicsState.acceleration.x;
    }
  }

  public activate(): void {
    this.isActive = true;
    console.log('activate');
  }

  public deactivate(): void {
    this.isActive = false;
  }

  private checkSideWalls(): { isWallLeft: boolean, isWallRight: boolean } {
    let isWallRight = false;
    let isWallLeft = false;

    if (this.physicsState.rightWall) {
      this.physicsState.rightWall = false;
      isWallRight = true;
    }

    if (this.physicsState.leftWall) {
      this.physicsState.leftWall = false;
      isWallLeft = true;
    }

    return { isWallLeft, isWallRight };
  }

  private checkTilesBottom(tiles: Collider[]): { isBottomRightTile: boolean, isBottomLeftTile: boolean } {
    let isBottomRightTile = false;
    let isBottomLeftTile = false;

    for (let tile of tiles) {
      if ((this.physicsState.position.x > tile.position.x)
        && (this.physicsState.position.x < tile.position.x + tile.size.x)
        && (this.physicsState.position.y + this.physicsState.size.y + 2 >= tile.position.y)
        && (this.physicsState.position.y + this.physicsState.size.y < tile.position.y + tile.size.y)
      ) {
        isBottomLeftTile = true;
      }

      if ((this.physicsState.position.x + this.physicsState.size.x < tile.position.x + tile.size.x)
        && (this.physicsState.position.x + this.physicsState.size.x > tile.position.x)
        && (this.physicsState.position.y + this.physicsState.size.y + 2 >= tile.position.y)
        && (this.physicsState.position.y + this.physicsState.size.y < tile.position.y + tile.size.y)
      ) {
        isBottomRightTile = true;
      }
    }

    return { isBottomRightTile, isBottomLeftTile };
  }

  private getDefault(): { isBottomRightTile, isBottomLeftTile } {
    return { isBottomRightTile: null, isBottomLeftTile: null }
  }
}
