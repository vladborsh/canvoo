import { Vector } from '../interfaces/vector';
import { AbstractStateEntity } from '../state/state-entity/abstract-state-entity';
import { AbstractRenderedEntity } from '../canvas/rendered-entity/abstract-rendered-entity';
import { StateController } from '../state/state-controller';
import { Canvas } from '../canvas/canvas';
import { generateUuid } from '../utils/generate-uuid';

export abstract class AbstractEntity {
  public readonly id = generateUuid();
  public stateEntity: AbstractStateEntity;
  public renderedEntity: AbstractRenderedEntity;

  constructor(public position: Vector, public size?: Vector) {}

  public onUpdate(func: (dt: number, stateEntity: AbstractStateEntity) => void) {
    this.stateEntity.onUpdate(func);
  }

  public onRender(func: () => void) {
    this.renderedEntity.render = func.bind(this.renderedEntity);
  }
}
