import { fromEvent } from 'rxjs';
import { Canvas } from '../canvas/canvas';
import { AbstractRenderedEntity } from '../canvas/rendered-entity/abstract-rendered-entity';
import { AnimationSprite } from '../canvas/rendered-entity/animation-sprite';
import { AbstractEntity } from '../entity/abstract-entity';
import { Vector } from '../interfaces/vector';
import { AbstractStateEntity } from '../state/state-entity/abstract-state-entity';

export class Cursor extends AbstractEntity {
  public cursorPosition: Vector = { x: 0, y: 0 };
  public position: Vector = { x: 0, y: 0 };

  constructor(
    private canvas: Canvas,
    size: Vector,
    animationLength: number,
    frameDuration: number,
    image: HTMLImageElement
  ) {
    super({ x: 0, y: 0 }, size);
    fromEvent(this.canvas.canvas, 'mousemove').subscribe((event: MouseEvent) => {
      this.cursorPosition.x = event.clientX;
      this.cursorPosition.y = event.clientY;
    });

    this.renderedEntity = new AnimationSprite(
      (<any>window).canvas,
      this.cursorPosition,
      size,
      animationLength,
      frameDuration,
      image,
      1000,
      false,
      false,
      false
    );
    this.stateEntity = new AbstractStateEntity((<any>window).state, this.position, {
      x: 1,
      y: 1,
    });

    canvas.addEntity(this.renderedEntity);
    (<any>window).state.addEntity(this.stateEntity);

    this.stateEntity.onUpdate(() => this.update());
  }

  private update(): void {
    this.position.x =
      this.cursorPosition.x +
      (this.canvas.cameraPosition.x - this.canvas.canvasHalfSize.x);
    this.position.y =
      this.cursorPosition.y +
      (this.canvas.cameraPosition.y - this.canvas.canvasHalfSize.y);
  }
}
