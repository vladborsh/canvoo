import { Vector } from 'src/core/interfaces/vector';
import { AbstractStateEntity } from 'src/core/state/state-entity/abstract-state-entity';
import { Canvas } from '../canvas';
import { AbstractRenderedEntity } from './abstract-rendered-entity';

const BOUNDING_BOX_STROKE_STYLE = '#55ee44';

export class AnimationSprite extends AbstractRenderedEntity {
  private currentFrame = 0;
  private elapsedTimeBetweenFrames = 0;
  private direction = 1;
  private halfSize: Vector;

  constructor(
    public canvas: Canvas,
    public position: Vector,
    public frameSize: Vector,
    public animationLength: number,
    public frameDuration: number,
    public image: HTMLImageElement,
    public layer: number,
    private isBoomerang = false,
    private withBoundingBox = false,
    private withCameraRelation = true
  ) {
    super(canvas, layer);
    this.halfSize = {
      x: frameSize.x / 2,
      y: frameSize.y / 2,
    };
  }

  public render(dt: number) {
    this.canvas.context.drawImage(
      this.image,
      this.currentFrame * this.frameSize.x,
      0,
      this.frameSize.x,
      this.frameSize.y,
      this.position.x -
        (this.withCameraRelation
          ? this.canvas.cameraPosition.x - this.canvas.canvasHalfSize.x
          : 0) - this.halfSize.x,
      this.position.y -
        (this.withCameraRelation
          ? this.canvas.cameraPosition.y - this.canvas.canvasHalfSize.y
          : 0) - this.halfSize.y,
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

    if (this.withBoundingBox) {
      this.canvas.context.strokeStyle = BOUNDING_BOX_STROKE_STYLE;
      this.canvas.context.strokeRect(
        this.canvas.cameraPosition.x -
          (this.canvas.cameraPosition.x - this.canvas.canvasHalfSize.x) -
          this.halfSize.x,
        this.canvas.cameraPosition.y -
          (this.canvas.cameraPosition.y - this.canvas.canvasHalfSize.y) -
          this.halfSize.y,
        this.frameSize.x,
        this.frameSize.y
      );
    }
  }
}
