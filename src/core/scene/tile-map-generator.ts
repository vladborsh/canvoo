import { AnimationSprite } from "../canvas/rendered-entity/animation-sprite";
import { AbstractEntity } from "../entity/abstract-entity";
import { AnimatedEntity } from "../entity/animated-entity";
import { RectangleEntity } from "../entity/rectangle-entity";
import { SpriteEntity } from "../entity/sprite-entity";
import { Vector } from "../interfaces/vector";

export interface BlockBlueprint {
  layer: number,
  image: HTMLImageElement,
  isAnimation?: boolean,
  animationLength?: number,
  frameDuration?: number,
  isBlock: boolean,
}

export class TileMapGenerator {
  public tiles: AbstractEntity[] = [];

  constructor(
    public map: string[][],
    public blockSamples: Record<string, BlockBlueprint>,
    public tileSize: Vector,
  ) {}

  generate(): void {
    for (let i = 0; i < this.map.length; i++) {
      for (let j = 0; j < this.map[i].length; j++) {
        if (this.map[i][j] && this.blockSamples[this.map[i][j]]) {
          let entity: AbstractEntity;
          if (this.blockSamples[this.map[i][j]].isAnimation) {
            entity = new AnimatedEntity(
              {
                x: j * this.tileSize.x,
                y: i * this.tileSize.y,
              },
              this.tileSize,
              this.blockSamples[this.map[i][j]].animationLength,
              this.blockSamples[this.map[i][j]].frameDuration,
              this.blockSamples[this.map[i][j]].image,
              this.blockSamples[this.map[i][j]].layer,
            );
          } else {
            entity = new SpriteEntity(
              {
                x: j * this.tileSize.x,
                y: i * this.tileSize.y,
              },
              this.tileSize,
              this.blockSamples[this.map[i][j]].image,
              this.blockSamples[this.map[i][j]].layer,
            );
          }

          if (this.blockSamples[this.map[i][j]].isBlock) {
            this.tiles.push(entity);
          }
        }
      }
    }
  }
}
