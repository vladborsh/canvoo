import { Canvas } from "../canvas/canvas";
import { AbstractRenderedEntity } from "../canvas/rendered-entity/abstract-rendered-entity";
import { Sprite } from "../canvas/rendered-entity/sprite";
import { Vector } from "../interfaces/vector";
import { AbstractStateEntity } from "../state/state-entity/abstract-state-entity";
import { RectangleStateEntity } from "../state/state-entity/rectangle-state.entity";

export class Weapon {
  private angleContainer = { alpha: 0 };
  private currentAngle: number;
  private stateEntity: AbstractStateEntity;
  private renderedEntity: AbstractRenderedEntity;

  constructor(
    public target: Vector,
    public position: Vector,
    public size: Vector,
    image: HTMLImageElement,
    layer: number,
    canvas: Canvas,
  ) {
    this.currentAngle = this.getTargetAngle();
    this.stateEntity = new RectangleStateEntity((<any>window).state, position, size);
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
    this.stateEntity.update = () => this.update();
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
