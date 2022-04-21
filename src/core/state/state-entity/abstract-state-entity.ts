import { Vector } from '../../interfaces/vector';

export interface AbstractStateEntity {
  controlState: Record<string, boolean>;
  position: Vector;
  size: Vector;
  update(dt: number, stateEntity: AbstractStateEntity): void;
}
