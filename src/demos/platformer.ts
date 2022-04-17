import { setup } from '../../src/core/setup/setup';
import { StatefulObject } from '../../src/core/entity/stateful-object';
import { Direction } from '../core/interfaces/direction';
import { TileMapGenerator } from '../../src/core/scene/tile-map-generator';
import { BackgroundFiller } from '../../src/core/entity/background-filler';
import { Vector } from '../../src/core/interfaces/vector';
import { CommonState } from '../../src/core/entity/common-state';
import { Missile } from '../../src/core/game-objects/missile';
import './assets';
import { Controls } from '../../src/core/state/state-controller';
import { Cursor } from '../../src/core/game-objects/cursor';
import { ParticleSource } from '../../src/core/entity/particle-source';
import { Bullet } from '../../src/core/game-objects/bullet';
import { multiply, sum } from '../../src/core/utils/calc';
import { Weapon } from '../../src/core/game-objects/weapon';

const fpsPlaceholder = document.querySelector('#fps_placeholder');

const MOVE_ACCELERATION: Vector = { x: 15, y: 40 };
const PERSON_LAYER = 2;
const FRICTION = 5;
const FREE_ACCELERATION: Vector = { x: 0, y: 80 };
const MAXIMUM_VELOCITY: Vector = { x: 35, y: 55 };

export function initGame() {
  const { canvas, state, loopController } = setup();

  new CommonState(
    canvas,
    state,
    loopController,
    {
      minion_idle: './src/demos/assets/minion_idle.png',
      minion_move_right: './src/demos/assets/minion_move.png',
      minion_move_left: './src/demos/assets/minion_move_left.png',
      wall: './src/demos/assets/wall_fragment.png',
      fire: './src/demos/assets/fire.png',
      wall_1: './src/demos/assets/wall_1.png',
      wall_2: './src/demos/assets/wall_2.png',
      wall_3: './src/demos/assets/wall_3.png',
      missile: './src/demos/assets/missile_1.png',
      aim_cursor: './src/demos/assets/aim_cursor.png',
      weapon_1: './src/demos/assets/weapon_1.png',
    },
    () => {
      loopController.subscribe((dt: number) => {
        fpsPlaceholder.textContent = `${Math.round(dt * 100)/100} dT`
      })
    },
    'main',
    {
      main: {
        withCanvas: true,
        init: (canvas, state, mediaStorage) => {
          new BackgroundFiller(
            canvas,
            {x: 150, y: 150},
            [
              mediaStorage.getSource('wall_1'),
              mediaStorage.getSource('wall_2'),
              mediaStorage.getSource('wall_3'),
            ]
          );

          const cursor = new Cursor(
            canvas,
            { x: 27, y: 27 },
            4,
            200,
            mediaStorage.getSource('aim_cursor'),
          );

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
              },
              'move_right': {
                animationLength: 3,
                frameDuration: 200,
                image: mediaStorage.getSource('minion_move_right'),
              },
              'move_left': {
                animationLength: 3,
                frameDuration: 200,
                image: mediaStorage.getSource('minion_move_left'),
              },
            },
            'idle',
            PERSON_LAYER,
          );

          canvas.cameraPosition = person.stateEntity.position;

          person.stateEntity.prevPosition.y--;

          const timeMap = new TileMapGenerator(
            [
              [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ],
              [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ],
              [' ', ' ', '#', ' ', ' ', ' ', ' ', ' ', '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ],
              [' ', ' ', '#', ' ', ' ', ' ', ' ', '#', '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ],
              [' ', ' ', '#', ' ', ' ', ' ', ' ', ' ', '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ],
              [' ', '#', '#', '#', '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ],
              [' ', '#', '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#', '#', ' ', ' ', '#', '#', ],
              [' ', '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#', ' ', ],
              [' ', '#', '#', '#', '#', '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#', ' ', ],
              [' ', ' ', ' ', ' ', ' ', '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#', ' ', ],
              [' ', ' ', ' ', ' ', ' ', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', ' ',],
              [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',],
              [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',],
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

          new Missile(
            person.position,
            { x: 700, y: 500, },
            { x: 10, y: 10, },
            { x: 45, y: 15},
            35,
            mediaStorage.getSource('missile'),
            5,
          );

          new Weapon(
            cursor.position,
            person.position,
            { x:45, y: 15 },
            mediaStorage.getSource('weapon_1'),
            20,
            canvas,
          )

          new ParticleSource(
            { x: 750, y: 560 },
            { x: 10, y: 10 },
            { x: 2, y: -5 },
            '#ffffff', /* '#ffee88d' */
            true,
            100,
            true,
            3,
            10,
            '#ffee88',
          );

          new ParticleSource(
            { x: 1000, y: 320 },
            { x: 10, y: 10 },
            { x: 1, y: -7 },
            '#ffffff', /* '#ffee88d' */
            true,
            100,
            true,
            5,
            10,
            '#ffee88',
          );

          person.onUpdate((dt, stateEntity) => {
            if (state.controlState[Direction.LEFT] && !stateEntity.leftWall) {
              stateEntity.acceleration.x = -MOVE_ACCELERATION.x;
              person.changeState('move_left');
            }
            if (state.controlState[Direction.RIGHT] && !stateEntity.rightWall) {
              stateEntity.acceleration.x = MOVE_ACCELERATION.x;
              person.changeState('move_right');
            }
            if (!state.controlState[Direction.LEFT] && !state.controlState[Direction.RIGHT]) {
              stateEntity.acceleration.x = 0;
              person.changeState('idle');
            }
            if (state.controlState[Direction.UP] && stateEntity.onGround) {
              stateEntity.acceleration.y = -MOVE_ACCELERATION.y;
            }
            if (!state.controlState[Direction.UP]) {
              stateEntity.acceleration.y = 0;
            }
            if (state.controlState[Controls.MOUSE_LEFT]) {
              canvas.addShake();
              new Bullet(
                { ...cursor.position },
                { ...person.stateEntity.position },
                { x: 10, y: 4 },
                10,
                10,
               '#ffffff',
               '#3377ff',
              );
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
                  stateEntity.acceleration.y = 0;
                  stateEntity.position.y = platform.position.y + stateEntity.size.y + 1;
                }
              }
            }

            if (!stateEntity.onGround || Math.abs(stateEntity.velocity.y)) {
              stateEntity.velocity.y = stateEntity.velocity.y + FREE_ACCELERATION.y * (dt / 500);
            }

            if (stateEntity.velocity.y < -MAXIMUM_VELOCITY.y && Math.abs(stateEntity.acceleration.y) > 0) {
              stateEntity.acceleration.y = 0;
            }

            if (Math.abs(stateEntity.velocity.x)) {
              if (stateEntity.velocity.x < 0) {
                stateEntity.velocity.x = stateEntity.velocity.x + FRICTION * (dt / 100);
              }
              if (stateEntity.velocity.x > 0) {
                stateEntity.velocity.x = stateEntity.velocity.x - FRICTION * (dt / 100);
              }
            }

            if (Math.abs(stateEntity.velocity.x) < 1) {
              stateEntity.velocity.x = 0;
            }

            if (Math.abs(stateEntity.velocity.x) > MAXIMUM_VELOCITY.x) {
              if (stateEntity.velocity.x < 0) {
                stateEntity.velocity.x = -MAXIMUM_VELOCITY.x;
              }
              if (stateEntity.velocity.x > 0) {
                stateEntity.velocity.x = MAXIMUM_VELOCITY.x;
              }
            }


            stateEntity.prevPosition.x = stateEntity.position.x;
            stateEntity.prevPosition.y = stateEntity.position.y;

            const dVelocity = sum(stateEntity.velocity, multiply(stateEntity.acceleration, dt / 100));
            stateEntity.velocity.x = dVelocity.x;
            stateEntity.velocity.y = dVelocity.y;
            const dPosition = sum(stateEntity.position, multiply(stateEntity.velocity, dt / 100));
            stateEntity.position.x = dPosition.x;
            stateEntity.position.y = dPosition.y;
          });
        }
      }
    }
  );
}
