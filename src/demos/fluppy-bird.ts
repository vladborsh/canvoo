import { MediaStorageController } from '../../src/core/canvas/media/media-storage-controller';
import { RectangleEntity } from '../../src/core/entity/rectangle-entity';
import { Vector } from '../../src/core/interfaces/vector';
import { setup } from '../../src/core/setup/setup';
import { Direction } from '../../src/core/state/control/direction';
import { AbstractStateEntity } from '../../src/core/state/state-entity/abstract-state-entity';
import { multiply, sum } from '../../src/core/utils/calc';
import { intersect } from '../../src/core/utils/physics';

export function initGame() {
  const { canvas, state } = setup();
  const mediaStorage = new MediaStorageController();

  mediaStorage.loadSources({}).subscribe(() => playGame());

  function playGame() {
    const cube = new RectangleEntity(
      { x: 100, y: 100 },
      { x: 50, y: 50 },
      '#333333'
    );
    const panel = new RectangleEntity(
      { x: 600, y: 90 },
      { x: 50, y: 200 },
      '#666666'
    );

    const jumpVelocity: Vector = { x: 0, y: -40 };
    const freeAcceleration: Vector = { x: 0, y: 100 };

    let ACTIVE = true;

    cube.onUpdate(
      (() => {
        return (dt: number, stateEntity: AbstractStateEntity) => {
          if (!ACTIVE) {
            return;
          }

          if (state.controlState[Direction.UP]) {
            stateEntity.velocity = jumpVelocity;
          }

          stateEntity.velocity = sum(
            stateEntity.velocity,
            multiply(freeAcceleration, dt / 1000)
          );

          if (
            intersect(
              cube.stateEntity.position,
              cube.stateEntity.size,
              panel.stateEntity.position,
              panel.stateEntity.size
            )
          ) {
            ACTIVE = false;
          }
        };
      })()
    );

    panel.onUpdate(
      (() => {
        panel.stateEntity.velocity = { x: -10, y: 0 };

        return (dt: number, stateEntity: AbstractStateEntity) => {
          if (!ACTIVE) {
            return;
          }

          if (stateEntity.position.x + stateEntity.size.x < 0) {
            stateEntity.position.x = canvas.canvas.width;
          }
        };
      })()
    );
  }
}
