import { Vector } from '../interfaces/vector';
import { Observable } from 'rxjs';
import { MediaStorage } from './media/media-storage';
import { AbstractRenderedEntity } from './rendered-entity/abstract-rendered-entity';
import { findIndex } from 'lodash';

export class Canvas {
  public canvas: HTMLCanvasElement;
  public context: CanvasRenderingContext2D;
  public canvasCenter: Vector;
  public mediaStorage$: Observable<MediaStorage>;
  public renderedEntitiesStorage: Record<number, AbstractRenderedEntity[]> = {};

  constructor() {
    this.createCanvas();
  }

  public createCanvas(w?: number, h?: number): void {
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
    this.canvas.width = w || window.innerWidth;
    this.canvas.height = h || window.innerHeight;
    document.body.style.margin = '0 0 0 0';
    this.canvasCenter = {
      x: this.canvas.width / 2,
      y: this.canvas.height / 2,
    };
    document.body.appendChild(this.canvas);
  }

  public addEntity(abstractRenderedEntity: AbstractRenderedEntity): void {
    if (!this.renderedEntitiesStorage[abstractRenderedEntity.layer]) {
      this.renderedEntitiesStorage[abstractRenderedEntity.layer] = [];
    }
    this.renderedEntitiesStorage[abstractRenderedEntity.layer].push(abstractRenderedEntity);
  }

  public destroy(layer: number, id: string) {
    this.renderedEntitiesStorage[layer].splice(
      findIndex(this.renderedEntitiesStorage[layer], (entity: AbstractRenderedEntity) =>
        entity.id === id
      ),
      1
    );
  }

  public drawText(
    text: string,
    position: Vector,
    fillStyle: string,
    fontSize: number,
    horizontalAlign: CanvasTextAlign = 'center',
    verticalAlign: CanvasTextBaseline = 'middle'
  ) {
    this.context.fillStyle = fillStyle;
    this.context.font = `bold ${fontSize}px sans-serif`;

    this.context.textAlign = horizontalAlign;
    this.context.textBaseline = verticalAlign;

    this.context.fillText(text, position.x, position.y);
  }
}
