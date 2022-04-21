import { MediaStorageController } from '../../src/core/canvas/media/media-storage-controller';
import { RectangleEntity } from '../../src/core/entity/rectangle-entity';
import { Vector } from '../../src/core/interfaces/vector';
import { setup } from '../../src/core/setup/setup';
import { Direction } from '../core/interfaces/direction';
import { AbstractStateEntity } from '../../src/core/state/state-entity/abstract-state-entity';
import { multiply, sum } from '../../src/core/utils/calc';
import { intersect } from '../core/physics/intersect';

export function initGame() {
  const { canvas, state } = setup();
  const mediaStorage = new MediaStorageController();

  mediaStorage.loadSources({}).subscribe(() => playGame());

  function playGame() {
    const cube = new RectangleEntity(
      { x: 100, y: 100 },
      { x: 50, y: 50 },
      2,
      '#333333'
    );
    const panel = new RectangleEntity(
      { x: 600, y: 90 },
      { x: 50, y: 200 },
      2,
      '#666666'
    );

    const jumpVelocity: Vector = { x: 0, y: -40 };
    const freeAcceleration: Vector = { x: 0, y: 100 };

    let ACTIVE = true;

    cube.stateEntity.update = (dt, stateEntity) => {
      if (!ACTIVE) {
        return;
      }

      if (state.controlState[Direction.UP]) {
        stateEntity.physicsState.velocity = jumpVelocity;
      }

      stateEntity.physicsState.velocity = sum(
        stateEntity.physicsState.velocity,
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

    panel.stateEntity.physicsState.velocity = { x: -10, y: 0 };
    panel.stateEntity.update = (dt: number, stateEntity: AbstractStateEntity) => {
      if (!ACTIVE) {
        return;
      }

      if (stateEntity.position.x + stateEntity.size.x < 0) {
        stateEntity.position.x = canvas.canvas.width;
      }
    };
  }
}
