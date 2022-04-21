import { Vector } from "src/core/interfaces/vector";
import { AbstractStateEntity } from "./abstract-state-entity";
import { PhysicsState } from "./physics-state";

export class RectangleStateEntity implements AbstractStateEntity {
  public physicsState = new PhysicsState();

  constructor(
    public controlState: Record<string, boolean>,
    public position: Vector,
    public size: Vector,
  ) {
    this.physicsState.prevPosition = this.position;
    this.physicsState.position = this.position;
    this.physicsState.size = this.size;
  }

  update(dt: number, stateEntity: RectangleStateEntity): void {}
}
