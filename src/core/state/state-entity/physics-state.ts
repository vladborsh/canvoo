import { Vector } from "src/core/interfaces/vector";

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
}
