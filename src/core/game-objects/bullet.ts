import { AbstractRenderedEntity } from '../canvas/rendered-entity/abstract-rendered-entity';
import { RectangleRenderedEntity } from '../canvas/rendered-entity/rectangle-rendered-entity';
import { Collider } from '../interfaces/collider';
import { Vector } from '../interfaces/vector';
import { findNearest, TileSegment } from '../physics/find-nearest-point';
import { intersectLineOnRect } from '../physics/intersect-line-on-rect';
import { intersectRects } from '../physics/intersect-rects';
import { RectangleStateEntity } from '../state/state-entity/rectangle-state.entity';

const ANGLE_RANDOMNESS = 0.07;

interface MovableTrack {
  position: Vector;
  size: Vector;
  callback: (position: Vector, angle: number) => void;
}

export class Bullet {
  public velocity: Vector;
  public stateEntity: RectangleStateEntity;
  public renderedEntity: AbstractRenderedEntity;
  private currentAngle: number = 0;
  private angleContainer = { alpha: 0 };
  private tiles: Collider[];
  private onTileHitCallback: (position: Vector, angle: number) => void;
  private onMovableHitTracks: MovableTrack[] = [];
  private finalTile: TileSegment;

  constructor(
    public target: Vector,
    public position: Vector,
    public size: Vector,
    public velocityMagnitude: number,
    layer: number,
    color: string,
    shadow?: string,
  ) {
    this.currentAngle = this.getTargetAngle() + this.getRandomVelDiff();
    this.angleContainer.alpha = this.currentAngle;
    this.velocity = {
      x: this.velocityMagnitude * Math.cos(this.currentAngle),
      y: this.velocityMagnitude * Math.sin(this.currentAngle),
    };
    this.stateEntity = new RectangleStateEntity((<any>window).state, position, size);
    this.renderedEntity = new RectangleRenderedEntity(
      (<any>window).canvas,
      color,
      size,
      this.stateEntity.position,
      layer,
      shadow,
      this.angleContainer,
    );

    (<any>window).canvas.addEntity(this.renderedEntity);
    (<any>window).state.addEntity(this.stateEntity);
    this.stateEntity.update = () => this.update();
  }

  public onMovableHit(position: Vector, size: Vector, cb: (position: Vector, angle: number) => void): void {
    this.onMovableHitTracks.push({
      position,
      size,
      callback: cb,
    })
  }

  public onTileHit(tiles: Collider[], cb: (position: Vector, angle: number) => void): void {
    this.onTileHitCallback = cb;
    this.tiles = tiles;
    this.findTrajectory();
  }

  public update(): void {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.finalTile && intersectRects(this.finalTile.tile, this.stateEntity.getCollider())) {
      this.onTileHitCallback(this.finalTile.point, this.currentAngle);
    }

    this.onMovableHitTracks.forEach(({position, size, callback}) => {
      if (intersectRects({position, size}, this.stateEntity.getCollider())) {
        callback(this.position, this.currentAngle);
      }
    });
  }

  private getTargetAngle(): number {
    return Math.atan2(this.target.y - this.position.y, this.target.x - this.position.x);
  }

  private getRandomVelDiff(): number {
    const sign = Math.random() > 0.5 ? 1 : -1;
    return sign * Math.random() * ANGLE_RANDOMNESS;
  }

  private findTrajectory(): void {
    if (!this.tiles.length) {
      return;
    }

    const rayLength = 2000;
    const rayEnd: Vector = {
      x: this.position.x + rayLength * Math.cos(this.currentAngle),
      y: this.position.y + rayLength * Math.sin(this.currentAngle),
    };

    const intersectedTiles = this.tiles.map(tile => ({
      tile,
      segment: intersectLineOnRect(tile, this.position, rayEnd)
    })).filter(({ segment }) => !!segment);

    if(intersectedTiles.length) {
      this.finalTile = this.getNearestIntersectedTile(intersectedTiles);
    }
  }

  private getNearestIntersectedTile(intersectedTiles: {tile: Collider, segment: Vector[]}[]): TileSegment {
    return findNearest(
      this.position,
      intersectedTiles.reduce(
        (acc: TileSegment[], { tile, segment }) => [
          ...acc,
          { tile, point: segment[0]},
          { tile, point: segment[1]},
        ],
        [],
      ),
    );
  }
}
