import { Vector } from 'src/core/interfaces/vector';
import { AbstractStateEntity } from 'src/core/state/state-entity/abstract-state-entity';
import { Canvas } from '../canvas';
import { AbstractRenderedEntity } from './abstract-rendered-entity';

export class AnimationSprite extends AbstractRenderedEntity {
  private currentFrame = 0;
  private elapsedTimeBetweenFrames = 0;
  private direction = 1;

  constructor(
    public canvas: Canvas,
    public stateEntity: AbstractStateEntity,
    public frameSize: Vector,
    public animationLength: number,
    public frameDuration: number,
    public image: HTMLImageElement,
    public layer: number,
    private isBoomerang = false,
    private withBoundingBox = false,
  ) {
    super(canvas, layer);
  }

  public render(dt: number) {
    this.canvas.context.drawImage(
      this.image,
      this.currentFrame * this.frameSize.x,
      0,
      this.frameSize.x,
      this.frameSize.y,
      this.stateEntity.position.x - (this.canvas.cameraPosition.x - this.canvas.canvasHalfSize.x),
      this.stateEntity.position.y - (this.canvas.cameraPosition.y - this.canvas.canvasHalfSize.y),
      this.frameSize.x,
      this.frameSize.y
    );

    this.elapsedTimeBetweenFrames += dt;

    if (this.elapsedTimeBetweenFrames > this.frameDuration) {
      this.currentFrame += this.direction;
      this.elapsedTimeBetweenFrames = 0;
    }

    if (this.currentFrame === this.animationLength) {
      if (this.isBoomerang) {
        this.direction = -1;
        this.currentFrame -= 2;
      } else {
        this.currentFrame = 0;
      }
    }

    if (this.currentFrame === 0 && this.isBoomerang) {
      this.direction = 1;
    }

    /* if (this.withBoundingBox) {
      this.canvas.context.fillStyle = '#55ee44';
      this.canvas.context.strokeRect(
        this.canvas.cameraPosition.x -this.stateEntity.position.x,
        this.canvas.cameraPosition.y -this.stateEntity.position.y,
        this.frameSize.x,
        this.frameSize.y
      )
    } */
  }
}
