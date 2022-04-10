import { MediaStorageController } from '../../src/core/canvas/media/media-storage-controller';
import { setup } from '../../src//core/setup/setup';
import { StatefulObject } from '../../src/core/entity/stateful-object';
import { Direction } from '../../src/core/state/control/direction';
import { RectangleEntity } from '../../src/core/entity/rectangle-entity';
import { getFreeAccelerationVelocity, intersect } from '../../src/core/utils/physics';
import { SpriteEntity } from '../../src/core/entity/sripte-entity';
import { TileMapGenerator } from '../../src/core/scene/tile-map-generator';

export function initGame() {
  const { canvas, state } = setup();
  const mediaStorage = new MediaStorageController();

  mediaStorage
    .loadSources({
      minion_idle: '../assets/minion_idle.png',
      minion_move_right: '../assets/minion_move.png',
      minion_move_left: '../assets/minion_move_left.png',
      wall: '../assets/wall_fragment.png',
    })
    .subscribe(() => playGame());

  function playGame() {
    const JUMP_VELOCITY = { x: 0, y: -40 };

    const person = new StatefulObject(
      { x: 400, y: 400 },
      { x: 60, y: 60 },
      state,
      canvas,
      {
        'idle': {
          animationLength: 3,
          frameDuration: 200,
          image: mediaStorage.getSource('minion_idle'),
          isBoomerang: true,
        },
        'move_right': {
          animationLength: 3,
          frameDuration: 200,
          image: mediaStorage.getSource('minion_move_right'),
          isBoomerang: false,
        },
        'move_left': {
          animationLength: 3,
          frameDuration: 200,
          image: mediaStorage.getSource('minion_move_left'),
          isBoomerang: false,
        },
      },
      'idle'
    );

    const timeMap = new TileMapGenerator(
      [
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', '#', ' ', ' ', ' ', ' ',],
        [' ', ' ', '#', ' ', ' ', ' ', ' ', '#', ' ', ' ', ' ', ' ',],
        [' ', ' ', '#', ' ', ' ', '#', '#', '#', ' ', ' ', ' ', ' ',],
        [' ', ' ', '#', ' ', ' ', ' ', ' ', '#', ' ', ' ', ' ', ' ',],
        [' ', ' ', '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',],
        [' ', ' ', '#', '#', '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ',],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',],
        [' ', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', ' ',],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',],
      ],
      {
        '#': { image: mediaStorage.getSource('wall') },
      },
      { x: 60, y: 60 },
    );

    timeMap.generate();

    person.onUpdate((dt, stateEntity) => {
      if (state.controlState[Direction.LEFT]) {
        stateEntity.velocity.x = -10;
        person.changeState('move_left');
      }
      if (state.controlState[Direction.RIGHT]) {
        stateEntity.velocity.x = 10;
        person.changeState('move_right');
      }
      if (!state.controlState[Direction.LEFT] && !state.controlState[Direction.RIGHT]) {
        stateEntity.velocity.x = 0;
        person.changeState('idle');
      }
      if (state.controlState[Direction.UP]) {
        stateEntity.velocity.y = JUMP_VELOCITY.y;
      }

      let isIntersection = false;

      for (let platform of timeMap.tiles) {
        if (
          intersect(
            person.stateEntity.position,
            person.stateEntity.size,
            platform.stateEntity.position,
            platform.stateEntity.size
          )
        ) {
          isIntersection = true
        }
      }

      if (isIntersection) {
        stateEntity.velocity.y = 0;
        stateEntity.position.y = stateEntity.prevPosition.y;
      } else {
        stateEntity.velocity = getFreeAccelerationVelocity(stateEntity.velocity, dt);
      }

      console.log(stateEntity.velocity);
    });
  }
}
