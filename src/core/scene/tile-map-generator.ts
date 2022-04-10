import { RectangleEntity } from "../entity/rectangle-entity";
import { SpriteEntity } from "../entity/sripte-entity";
import { Vector } from "../interfaces/vector";

export interface BlockBlueprint {
  image: HTMLImageElement,
}

export class TileMapGenerator {
  public tiles: RectangleEntity[] = [];

  constructor(
    public map: string[][],
    public blockSamples: Record<string, BlockBlueprint>,
    public tileSize: Vector,
  ) {}

  generate(): void {
    for (let i = 0; i < this.map.length; i++) {
      for (let j = 0; j < this.map[i].length; j++) {
        if (this.map[i][j] && this.blockSamples[this.map[i][j]]) {
          this.tiles.push(
            new SpriteEntity(
              {
                x: j * this.tileSize.x,
                y: i * this.tileSize.y,
              },
              this.tileSize,
              this.blockSamples[this.map[i][j]].image,
            )
          );
        }
      }
    }
  }
}
