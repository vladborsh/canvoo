import { Vector } from '../interfaces/vector';
import { Observable } from 'rxjs';
import { MediaStorage } from './media/media-storage';
import { AbstractRenderedEntity } from './rendered-entity/abstract-rendered-entity';
import { findIndex } from 'lodash';
import { ScreenShake } from './screen-shake';

export class Canvas {
  public canvas: HTMLCanvasElement;
  public context: CanvasRenderingContext2D;
  public mediaStorage$: Observable<MediaStorage>;
  public renderedEntitiesStorage: Record<number, AbstractRenderedEntity[]> = {};
  public cameraPosition: Vector;
  public canvasHalfSize: Vector;
  private screenShake = new ScreenShake(this);

  constructor() {
    this.createCanvas();
  }

  public createCanvas(w?: number, h?: number): void {
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
    this.canvas.width = w || window.innerWidth;
    this.canvas.height = h || window.innerHeight;
    this.canvasHalfSize = {
      x: this.canvas.width / 2,
      y: this.canvas.height / 2,
    }
    document.body.style.margin = '0 0 0 0';
    this.cameraPosition = {
      x: this.canvas.width / 2,
      y: this.canvas.height / 2,
    };
    document.body.appendChild(this.canvas);
  }

  public addShake(): void {
    this.screenShake.addShake();
  }

  public clear(): void {
    this.context.clearRect(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
  }

  public render(dt: number): void {
    this.context.save();
    this.screenShake.render();
    Object.values(this.renderedEntitiesStorage)
      .forEach((layer: AbstractRenderedEntity[]) => {
        layer.forEach(
          (renderedObject: AbstractRenderedEntity) => {
            if (renderedObject.isActive) {
              renderedObject.render(dt, renderedObject);
            }
          }
        )
      });
    this.context.restore();
  }

  public addEntity(abstractRenderedEntity: AbstractRenderedEntity): void {
    if (!this.renderedEntitiesStorage[abstractRenderedEntity.layer]) {
      this.renderedEntitiesStorage[abstractRenderedEntity.layer] = [];
    }
    this.renderedEntitiesStorage[abstractRenderedEntity.layer].push(abstractRenderedEntity);
  }
}
