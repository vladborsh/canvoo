import { Vector } from '../interfaces/vector';
import { AbstractStateEntity } from '../state/state-entity/abstract-state-entity';
import { AbstractRenderedEntity } from '../canvas/rendered-entity/abstract-rendered-entity';
import { generateUuid } from '../utils/generate-uuid';

export abstract class AbstractEntity {
  public readonly id = generateUuid();
  public stateEntity: AbstractStateEntity;
  public renderedEntity: AbstractRenderedEntity;

  constructor(public position: Vector, public size?: Vector) {}

  public onUpdate(func: (dt: number, stateEntity: AbstractStateEntity) => void) {
    this.stateEntity.onUpdate(func);
  }

  public onRender(func: (dt: number, entity: AbstractRenderedEntity) => void) {
    this.renderedEntity.onRender(func);
  }
}