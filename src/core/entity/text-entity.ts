import { Sprite } from '../canvas/rendered-entity/sprite';
import { TextRenderedEntity } from '../canvas/rendered-entity/text-rendered-entity';
import { Vector } from '../interfaces/vector';
import { AbstractStateEntity } from '../state/state-entity/abstract-state-entity';
import { AbstractEntity } from './abstract-entity';

export class TextEntity extends AbstractEntity {
  constructor(
    text: string,
    public position: Vector,
    public size: Vector,
    public fillStyle: string,
    public fontSize: number,
    layer: number,
  ) {
    super(position, size);
    this.stateEntity = new AbstractStateEntity(
      (<any>window).state,
      position,
      size
    );
    this.renderedEntity = new TextRenderedEntity(
      (<any>window).canvas,
      text,
      this.position,
      this.fillStyle,
      this.fontSize,
      layer,
    );
    (<any>window).canvas.addEntity(this.renderedEntity);
    (<any>window).state.addEntity(this.stateEntity);
    this.stateEntity.onUpdate(() => {});
  }
}
