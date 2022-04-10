import { AbstractEntity } from './abstract-entity';
import { Vector } from '../interfaces/vector';
import { RectangleRenderedEntity } from '../canvas/rendered-entity/rectangle-rendered-entity';
import { AbstractStateEntity } from '../state/state-entity/abstract-state-entity';

export class RectangleEntity extends AbstractEntity {
  constructor(position: Vector, size: Vector, color?: string) {
    super(position, size);
    this.stateEntity = new AbstractStateEntity((<any>window).state, position, size);
    this.renderedEntity = new RectangleRenderedEntity(
      (<any>window).canvas,
      color ? color : '#444444',
      size,
      this.stateEntity
    );
  }
}
