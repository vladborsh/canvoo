import { AbstractEntity } from "../entity/abstract-entity";
import { Vector } from "../interfaces/vector";

class Bullet  extends AbstractEntity {
  constructor(
    public target: Vector,
    public position: Vector,
    public size: Vector,
    public velocityMagnitude: number,
    image: HTMLImageElement,
    layer: number,
  ) {
    super(position, size);
  }
}
