import { Canvas } from "../canvas/canvas";
import { AbstractRenderedEntity } from "../canvas/rendered-entity/abstract-rendered-entity";
import { Sprite } from "../canvas/rendered-entity/sprite";
import { AbstractEntity } from "../entity/abstract-entity";
import { Vector } from "../interfaces/vector";
import { AbstractStateEntity } from "../state/state-entity/abstract-state-entity";

export class Weapon extends AbstractEntity {
  private currentAngle: number = 0;
  private angleContainer = { alpha: 0 };

  constructor(
    public target: Vector,
    public position: Vector,
    public size: Vector,
    image: HTMLImageElement,
    layer: number,
    canvas: Canvas,
  ) {
    super(position, size);
    this.currentAngle = this.getTargetAngle();
    this.stateEntity = new AbstractStateEntity((<any>window).state, position, size);
    this.renderedEntity = new Sprite(
      (<any>window).canvas,
      this.stateEntity.position,
      size,
      image,
      layer,
      this.angleContainer,
      false,
    );

    canvas.addEntity(this.renderedEntity);
    (<any>window).state.addEntity(this.stateEntity);
    this.stateEntity.onUpdate(() => this.update());
  }

  public update(): void {
    this.currentAngle = this.getTargetAngle();
    this.angleContainer.alpha = this.currentAngle;
  }

  private getTargetAngle(): number {
    return Math.atan2(
      this.target.y - this.position.y,
      this.target.x - this.position.x
    )
  }
}
