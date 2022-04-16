import { fromEvent } from "rxjs";
import { Canvas } from "../canvas/canvas";
import { AbstractRenderedEntity } from "../canvas/rendered-entity/abstract-rendered-entity";
import { AnimationSprite } from "../canvas/rendered-entity/animation-sprite";
import { Vector } from "../interfaces/vector";

export class Cursor {
  public position: Vector = { x: 0, y: 0 }
  public renderedEntity: AbstractRenderedEntity;

  constructor(
    private canvas: Canvas,
    size: Vector,
    animationLength: number,
    frameDuration: number,
    image: HTMLImageElement,
  ) {
    fromEvent(this.canvas.canvas, 'mousemove')
      .subscribe((event: MouseEvent) => {
        this.position.x = event.clientX;
        this.position.y = event.clientY;
      });

    this.renderedEntity = new AnimationSprite(
      (<any>window).canvas,
      this.position,
      size,
      animationLength,
      frameDuration,
      image,
      1000,
      false,
      false,
      false,
    );

    canvas.addEntity(this.renderedEntity);
  }
}
