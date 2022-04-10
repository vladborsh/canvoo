import { MediaStorageController } from '../../src/core/canvas/media/media-storage-controller';
import { setup } from '../../src//core/setup/setup';
import { StatefulObject } from '../../src/core/entity/stateful-object';
import { Direction } from '../../src/core/state/control/direction';
import { getFreeAccelerationVelocity, intersect } from '../../src/core/utils/physics';
import { TileMapGenerator } from '../../src/core/scene/tile-map-generator';
import { FpsEntity } from '../../src/core/entity/fps-entity';
import { BackgroundFiller } from '../../src/core/entity/background-filler';

export function initGame() {
  const { canvas, state, loopController } = setup();
  const mediaStorage = new MediaStorageController();

  mediaStorage
    .loadSources({
      minion_idle: '../assets/minion_idle.png',
      minion_move_right: '../assets/minion_move.png',
      minion_move_left: '../assets/minion_move_left.png',
      wall: '../assets/wall_fragment.png',
      fire: '../assets/fire.png',
      wall_1: '../assets/wall_1.png',
      wall_2: '../assets/wall_2.png',
      wall_3: '../assets/wall_3.png',
    })
    .subscribe(() => playGame());

  new FpsEntity(canvas, loopController);

  function playGame() {
    const JUMP_VELOCITY = { x: 0, y: -60 };
    const PERSON_LAYER = 2;

    new BackgroundFiller(
      canvas,
      {x: 150, y: 150},
      [
        mediaStorage.getSource('wall_1'),
        mediaStorage.getSource('wall_2'),
        mediaStorage.getSource('wall_3'),
      ]
    )

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
      'idle',
      PERSON_LAYER,
    );

    const timeMap = new TileMapGenerator(
      [
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', '#', ' ', ' ', ' ', ' ',],
        [' ', ' ', '#', ' ', ' ', ' ', 'f', '#', ' ', ' ', ' ', ' ',],
        [' ', ' ', '#', ' ', ' ', '#', '#', '#', ' ', ' ', ' ', ' ',],
        [' ', ' ', '#', ' ', ' ', ' ', ' ', '#', ' ', ' ', ' ', ' ',],
        [' ', ' ', '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',],
        [' ', ' ', '#', '#', '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ',],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'f', ' ', ' ', ' ',],
        [' ', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', ' ',],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',],
      ],
      {
        '#': {
          image: mediaStorage.getSource('wall'),
          layer: PERSON_LAYER,
          isBlock: true,
        },
        'f': {
          image: mediaStorage.getSource('fire'),
          layer: 1,
          isAnimation: true,
          animationLength: 4,
          frameDuration: 400,
          isBlock: false,
        },
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
    });
  }
}
