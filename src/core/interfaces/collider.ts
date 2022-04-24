import { Vector } from "./vector";

export interface Collider {
  position: Vector,
  size: Vector,
  isHighlighted?: boolean,
}
