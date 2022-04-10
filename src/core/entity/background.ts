import { AbstractEntity } from './abstract-entity';
import { BackgroundEntity } from '../canvas/rendered-entity/background-entity';

export class Background extends AbstractEntity {
  constructor(color?: string) {
    super(null, null);
    this.renderedEntity = new BackgroundEntity(
      (<any>window).canvas,
      color ? color : '#444444'
    );
  }
}
