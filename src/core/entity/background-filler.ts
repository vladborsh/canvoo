import { Vector } from '../interfaces/vector';
import { AbstractRenderedEntity } from '../canvas/rendered-entity/abstract-rendered-entity';
import { Canvas } from '../canvas/canvas';
import { generateRandom } from '../utils/random';

interface BackgroundTile {
  image: HTMLImageElement,
}

export class BackgroundFiller implements AbstractRenderedEntity {
  private grid: BackgroundTile[][] = [];
  public isActive = true;

  constructor(
    public canvas: Canvas,
    public fragmentSize: Vector,
    public images: HTMLImageElement[],
    public layer: number,
  ) {
    (<any>window).canvas.addEntity(this);
    for (let i = 0; i < this.canvas.canvas.width; i += this.fragmentSize.x) {
      const row = [];
      for (let j = 0; j < this.canvas.canvas.height; j += this.fragmentSize.y) {
        row.push({
          image: this.images[generateRandom(this.images.length)],
        })
      }
      this.grid.push(row);
    }
  }

  public render(): void {
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        this.canvas.context.drawImage(
          this.grid[i][j].image,
          i * this.fragmentSize.x,
          j * this.fragmentSize.y,
          this.fragmentSize.x,
          this.fragmentSize.y,
        );
      }
    }
  }
}

