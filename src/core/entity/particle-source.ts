import { RectangleRenderedEntity } from "../canvas/rendered-entity/rectangle-rendered-entity";
import { Vector } from "../interfaces/vector";
import { RectangleStateEntity } from "../state/state-entity/rectangle-state.entity";
import { multiply, sum } from "../utils/calc";
import { RectangleEntity } from "./rectangle-entity";

const SIZE_REDUCING_SPEED = 0.1;

export class ParticleSource {
  private particles: RectangleEntity[] = [];

  constructor(
    public position: Vector,
    public singleParticleSize: Vector,
    public velocity: Vector,
    public color: string,
    public reduceSize: boolean,
    public particleLifetime: number,
    public isInfinite: boolean,
    public velocityDiffRange: number,
    public layer: number,
    public particleCount: number,
    public shadow?: string,
  ) {
    for (let i = 0; i < this.particleCount; i++) {
      const rect = new RectangleEntity(
        { x: this.position.x, y: this.position.y},
        { x: singleParticleSize.x, y: singleParticleSize.y },
        layer,
        color,
        shadow,
      );
      this.particles.push(rect);

      rect.stateEntity.physicsState.velocity = {
        x: this.velocity.x + this.getRandomVelDiff(),
        y: this.velocity.y + this.getRandomVelDiff(),
      }

      const sizeReducing = SIZE_REDUCING_SPEED;
      const concreteParticleLifetime = Math.random() * particleLifetime;

      rect.stateEntity.update = ((() => {
        let iteration = 0;

        return (dt, stateEntity: RectangleStateEntity) => {
          if (this.reduceSize && stateEntity.size.x > 0 || stateEntity.size.x > 0) {
            stateEntity.size.x -= sizeReducing;
            stateEntity.size.y -= sizeReducing;
          }

          iteration++;

          if ((stateEntity.size.x <= 0 || stateEntity.size.x <= 0 || iteration >= concreteParticleLifetime) && isInfinite) {
            stateEntity.size.x = singleParticleSize.x;
            stateEntity.size.y = singleParticleSize.y;
            stateEntity.position.x = this.position.x;
            stateEntity.position.y = this.position.y;
            stateEntity.physicsState.velocity.x = this.velocity.x + this.getRandomVelDiff();
            stateEntity.physicsState.velocity.y = this.velocity.y + this.getRandomVelDiff();
            iteration = 0
          }

          const dPosition = sum(stateEntity.position, multiply(stateEntity.physicsState.velocity, dt / 100));
          stateEntity.position.x = dPosition.x;
          stateEntity.position.y = dPosition.y;
        }
      })())
    }
  }

  private getRandomVelDiff(): number {
    const sign = Math.random() > 0.5 ? 1 : -1;
    return sign * Math.random() * this.velocityDiffRange;
  }
}
