import { MediaStorageController } from '../../src/core/canvas/media/media-storage-controller';
import { setup } from '../../src/core/setup/setup';
import { StatefulObject } from '../../src/core/entity/stateful-object';
import { Direction } from '../core/interfaces/direction';
import { FREE_ACCELERATION, setCollisions, getFreeAccelerationVelocity, intersect, RectCollision, setCollisions2 } from '../core/physics/physics';
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
  const JUMP_VELOCITY = { x: 0, y: -80 };
    const MOVE_VELOCITY = { x: 20, y: 0 };
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
      { x: 500, y: 300 },
      { x: 60, y: 60 },
      state,
      canvas,
      {
        'idle': {
          animationLength: 3,
          frameDuration: 200,
          image: mediaStorage.getSource('minion_idle'),
          isBoomerang: true,
          withBoundingBox: true,
        },
        'move_right': {
          animationLength: 3,
          frameDuration: 200,
          image: mediaStorage.getSource('minion_move_right'),
          withBoundingBox: true,
        },
        'move_left': {
          animationLength: 3,
          frameDuration: 200,
          image: mediaStorage.getSource('minion_move_left'),
          withBoundingBox: true,
        },
      },
      'idle',
      PERSON_LAYER,
    );

    canvas.cameraPosition = person.stateEntity.position;

    person.stateEntity.prevPosition.y--;

    const timeMap = new TileMapGenerator(
      [
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#', ' ', ' ', ' ',],
        [' ', ' ', '#', ' ', ' ', ' ', ' ', ' ', '#', ' ', ' ', ' ',],
        [' ', ' ', '#', ' ', ' ', ' ', ' ', '#', '#', ' ', ' ', ' ',],
        [' ', ' ', '#', 'f', ' ', ' ', ' ', ' ', '#', ' ', ' ', ' ',],
        [' ', ' ', '#', '#', '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ',],
        [' ', ' ', '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#', ' ', ' ',],
        [' ', '#', '#', '#', '#', '#', ' ', ' ', ' ', ' ', ' ', ' ',],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',],
        [' ', ' ', ' ', ' ', ' ', ' ', '#', '#', '#', '#', '#', ' ',],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',],
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

    person.stateEntity.velocity.y = 1;

    person.onUpdate((dt, stateEntity) => {
      if (state.controlState[Direction.LEFT] && !stateEntity.leftWall) {
        stateEntity.velocity.x = -MOVE_VELOCITY.x;
        person.changeState('move_left');
      }
      if (state.controlState[Direction.RIGHT] && !stateEntity.rightWall) {
        stateEntity.velocity.x = MOVE_VELOCITY.x;
        person.changeState('move_right');
      }
      if (!state.controlState[Direction.LEFT] && !state.controlState[Direction.RIGHT]) {
        stateEntity.velocity.x = 0;
        person.changeState('idle');
      }
      if (state.controlState[Direction.UP] && stateEntity.onGround) {
        stateEntity.velocity.y = JUMP_VELOCITY.y;
      }

      let untouchedGroundWalls = 0;
      let untouchedLeftWalls = 0;
      let untouchedRightWalls = 0;

      for (let platform of timeMap.tiles) {
        /* ground */
        if (
          stateEntity.velocity.y > 0 &&
          stateEntity.position.y < platform.position.y &&
          stateEntity.position.y + stateEntity.size.y > platform.position.y &&
          stateEntity.position.x < platform.position.x + platform.size.x &&
          stateEntity.position.x + stateEntity.size.x > platform.position.x
        ) {
          const dy = Math.max(stateEntity.position.y, platform.position.y) -
            Math.min(stateEntity.position.y + stateEntity.size.y , platform.position.y + platform.size.y);
          const dx = Math.min(stateEntity.position.x + stateEntity.size.x, platform.position.x + platform.size.x) -
            Math.max(stateEntity.position.x, platform.position.x);
          if (Math.abs(dx) > Math.abs(dy)) {
            stateEntity.velocity.y = 0;
            stateEntity.position.y = platform.position.y - stateEntity.size.y - 1;
            stateEntity.onGround = true;
            stateEntity.spaceBottom = false;
          }
        }

        if (
          stateEntity.onGround &&
          !(
            stateEntity.position.y + 2 < platform.position.y &&
            stateEntity.position.y + 2 + stateEntity.size.y > platform.position.y &&
            stateEntity.position.x < platform.position.x + platform.size.x &&
            stateEntity.position.x + stateEntity.size.x > platform.position.x
          )
        ) {
          untouchedGroundWalls++;

          if (untouchedGroundWalls === timeMap.tiles.length) {
            stateEntity.onGround = false;
          }
        }

        /* left wall */
        if (
          stateEntity.velocity.x < 0 &&
          stateEntity.position.x < platform.position.x + platform.size.x &&
          stateEntity.position.x + stateEntity.size.x > platform.position.x + platform.size.x &&
          stateEntity.position.y < platform.position.y + platform.size.y &&
          stateEntity.position.y + stateEntity.size.y > platform.position.y
        ) {
          const dy = Math.max(stateEntity.position.y, platform.position.y) -
            Math.min(stateEntity.position.y + stateEntity.size.y , platform.position.y + platform.size.y);
          const dx = Math.min(stateEntity.position.x + stateEntity.size.x, platform.position.x + platform.size.x) -
            Math.max(stateEntity.position.x, platform.position.x);
          if (Math.abs(dx) < Math.abs(dy)) {
            stateEntity.leftWall = true;
            stateEntity.position.x = platform.position.x + platform.size.x + 1;
            stateEntity.velocity.x = 0;
          }
        }

        if (
          stateEntity.leftWall &&
          !(
            stateEntity.position.x - 2 < platform.position.x + platform.size.x &&
            stateEntity.position.x - 2 + stateEntity.size.x > platform.position.x + platform.size.x &&
            stateEntity.position.y < platform.position.y + platform.size.y &&
            stateEntity.position.y + stateEntity.size.y > platform.position.y
          )
        ) {
          untouchedLeftWalls++;

          if (untouchedLeftWalls === timeMap.tiles.length) {
            stateEntity.leftWall = false;
          }
        }

        /* right wall */
        if (
          stateEntity.velocity.x > 0 &&
          stateEntity.position.x + stateEntity.size.x > platform.position.x &&
          stateEntity.position.x < platform.position.x &&
          stateEntity.position.y < platform.position.y + platform.size.y &&
          stateEntity.position.y + stateEntity.size.y > platform.position.y
        ) {
          const dy = Math.max(stateEntity.position.y, platform.position.y) -
            Math.min(stateEntity.position.y + stateEntity.size.y , platform.position.y + platform.size.y);
          const dx = Math.min(stateEntity.position.x + stateEntity.size.x, platform.position.x + platform.size.x) -
            Math.max(stateEntity.position.x, platform.position.x);
          if (Math.abs(dx) < Math.abs(dy)) {
            stateEntity.rightWall = true;
            stateEntity.position.x = platform.position.x - platform.size.x - 1;
            stateEntity.velocity.x = 0;
          }
        }

        if (
          stateEntity.rightWall &&
          !(
            stateEntity.position.x + stateEntity.size.x + 2 > platform.position.x &&
            stateEntity.position.x + 2 < platform.position.x &&
            stateEntity.position.y < platform.position.y + platform.size.y &&
            stateEntity.position.y + stateEntity.size.y > platform.position.y
          )
        ) {
          untouchedRightWalls++;

          if (untouchedRightWalls === timeMap.tiles.length) {
            stateEntity.rightWall = false;
          }
        }

        /* ceil */
        if (
          stateEntity.velocity.y < 0 &&
          stateEntity.position.y < platform.position.y + platform.size.y  &&
          stateEntity.position.y + stateEntity.size.y > platform.position.y &&
          stateEntity.position.x < platform.position.x + platform.size.x &&
          stateEntity.position.x + stateEntity.size.x > platform.position.x
        ) {
          const dy = Math.max(stateEntity.position.y, platform.position.y) -
            Math.min(stateEntity.position.y + stateEntity.size.y , platform.position.y + platform.size.y);
          const dx = Math.min(stateEntity.position.x + stateEntity.size.x, platform.position.x + platform.size.x) -
            Math.max(stateEntity.position.x, platform.position.x);
          if (Math.abs(dx) > Math.abs(dy)) {
            stateEntity.velocity.y = 0;
            stateEntity.position.y = platform.position.y + stateEntity.size.y + 1;
          }
        }
      }

      if(!stateEntity.onGround) {
        stateEntity.velocity.y = getFreeAccelerationVelocity(stateEntity.velocity, dt).y;
      }
    });
  }
}
