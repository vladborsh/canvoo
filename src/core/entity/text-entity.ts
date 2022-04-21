import { AbstractRenderedEntity } from '../canvas/rendered-entity/abstract-rendered-entity';
import { TextRenderedEntity } from '../canvas/rendered-entity/text-rendered-entity';
import { Vector } from '../interfaces/vector';
import { AbstractStateEntity } from '../state/state-entity/abstract-state-entity';

export class TextEntity {
  public renderedEntity: AbstractRenderedEntity;

  constructor(
    text: string,
    public position: Vector,
    public size: Vector,
    public fillStyle: string,
    public fontSize: number,
    layer: number,
  ) {
    this.renderedEntity = new TextRenderedEntity(
      (<any>window).canvas,
      text,
      this.position,
      this.fillStyle,
      this.fontSize,
      layer,
    );
    (<any>window).canvas.addEntity(this.renderedEntity);
  }
}
