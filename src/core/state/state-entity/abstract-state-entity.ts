import { generateUuid } from '../../utils/generate-uuid';
import { Vector } from '../../interfaces/vector';
import { StateController } from '../state-controller';
import { Direction } from '../control/direction';
import { multiply, sum } from '../../../core/utils/calc';

export class AbstractStateEntity {
  public readonly id = generateUuid();
  public readonly controlState: Record<Direction, boolean>;
  public size: Vector;
  public position: Vector;
  public prevPosition: Vector;
  public velocity: Vector = { x: 0, y: 0 };
  public update: (dt: number) => void;

  constructor(public stateController: StateController, position?: Vector, size?: Vector) {
    this.controlState = stateController.controlState;
    this.size = size ? size : { x: 0, y: 0 };
    this.position = position ? position : { x: 0, y: 0 };
    this.prevPosition = this.position;
  }

  destroy() {
    this.stateController.destroy(this.id);
  }

  public onUpdate(func: (dt: number, stateEntity: AbstractStateEntity) => void) {
    this.update = (dt: number) => {
      func(dt, this);

      this.prevPosition = { ...this.position };
      this.position = sum(this.position, multiply(this.velocity, dt / 100));
    };
  }
}
