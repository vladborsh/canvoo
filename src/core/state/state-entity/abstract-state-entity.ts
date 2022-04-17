import { generateUuid } from '../../utils/generate-uuid';
import { Vector } from '../../interfaces/vector';
import { StateController } from '../state-controller';
import { Direction } from '../../interfaces/direction';
import { multiply, sum } from '../../../core/utils/calc';

export class AbstractStateEntity {
  public readonly id = generateUuid();
  public readonly controlState: Record<Direction, boolean>;
  public prevPosition: Vector;
  public velocity: Vector = { x: 0, y: 0 };
  public acceleration: Vector = { x: 0, y: 0 };
  public onGround = false;
  public spaceBottom = true;
  public leftWall = false;
  public rightWall = false;
  public update: (dt: number) => void;

  constructor(
    public stateController: StateController,
    public position: Vector = { x: 0, y: 0 },
    public size: Vector = { x: 0, y: 0 },
  ) {
    this.controlState = stateController.controlState;
    this.prevPosition = this.position;
  }

  destroy() {
    this.stateController.destroy(this.id);
  }

  public onUpdate(func: (dt: number, stateEntity: AbstractStateEntity) => void) {
    this.update = (dt: number) => {
      func(dt, this);
    };
  }
}
