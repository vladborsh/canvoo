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
import { Weapon } from '../../src/core/game-objects/weapon';
import { TilesCollision } from '../core/physics/tiles-collision';
import { Enemy } from '../../src/core/game-objects/enemy';
import { throttle } from '../../src/core/utils/throttle';

const fpsPlaceholder = document.querySelector('#fps_placeholder');

const MOVE_ACCELERATION: Vector = { x: 15, y: 70 };
const PERSON_LAYER = 2;
const FRICTION = 0.1;
const GRAVITY =  0.1;
const MAXIMUM_VELOCITY = { x: 35, y: 35 };

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
      enemy: './src/demos/assets/enemy.png',
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
            ],
            0,
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

          const tileMap = new TileMapGenerator(
            [
              [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',],
              [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',],
              [' ', ' ', '#', ' ', ' ', ' ', ' ', ' ', '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',],
              [' ', ' ', '#', ' ', ' ', ' ', ' ', '#', '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',],
              [' ', ' ', '#', ' ', ' ', ' ', ' ', ' ', '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',],
              [' ', '#', '#', '#', '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',],
              [' ', '#', '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#', '#', ' ', ' ', '#', '#',],
              [' ', '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#', ' ',],
              [' ', '#', '#', '#', '#', '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',],
              [' ', ' ', ' ', ' ', ' ', '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',],
              [' ', ' ', ' ', ' ', ' ', '#', '#', '#', '#', '#', ' ', ' ', ' ', '#', '#', '#', '#', '#', ' ',],
              [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#', ' ', ' ', ' ', ' ',],
              [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',],
              [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',],
              [' ', ' ', ' ', ' ', ' ', ' ', ' ', '#', '#', '#', '#', '#', ' ', ' ', ' ', ' ', ' ', ' ', '#',],
              [' ', ' ', ' ', ' ', ' ', ' ', '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#', '#', '#',],
              [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#', ' ', ' ',],
              [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#', '#', ' ', '#', '#', '#', '#', '#', ' ', ' ',],
              [' ', ' ', '#', '#', '#', '#', '#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',],
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
          tileMap.generate();

          person.stateEntity.physicsState.prevPosition.y--;
          person.stateEntity.physicsState.velocity.y = 1;

          new Weapon(
            cursor.position,
            person.stateEntity.position,
            { x: 45, y: 15 },
            mediaStorage.getSource('weapon_1'),
            20,
            canvas,
          );

          new ParticleSource(
            { x: 1000, y: 320 },
            { x: 10, y: 10 },
            { x: 1, y: -7 },
            '#ffffff',
            true,
            100,
            true,
            5,
            10,
            30,
            '#ee77ff',
          );

          const tilesCollision = new TilesCollision(GRAVITY, MAXIMUM_VELOCITY, FRICTION);

          const addHeroBullet = throttle(() => {
            canvas.addShake();
            const bullet = new Bullet(
              { ...cursor.position },
              { ...person.stateEntity.physicsState.position },
              { x: 10, y: 5 },
              10,
              10,
              '#ffffff',
              '#ffff54',
            );
            bullet.onTileHit(tileMap.tiles, (pos: Vector, angle: number) => {
              new ParticleSource(
                { x: pos.x, y: pos.y },
                { x: 5, y: 5 },
                { x: -5 * Math.cos(angle), y: -5 * Math.sin(angle) },
                '#ffffff',
                true,
                100,
                false,
                5,
                10,
                5,
                '#ffcc44',
              );

              bullet.position.x = -10000;
              bullet.position.y = -10000;
              bullet.velocity.x = 0;
              bullet.velocity.y = 0;
            });
            bullet.onMovableHit(
              enemy.stateEntity.position,
              enemy.stateEntity.size,
              {},
              (pos: Vector, angle: number) => {
              new ParticleSource(
                { x: pos.x, y: pos.y },
                { x: 5, y: 5 },
                { x: 5 * Math.cos(angle), y: 5 * Math.sin(angle) },
                '#aa0000',
                true,
                100,
                false,
                5,
                10,
                5,
              );

              bullet.position.x = -10000;
              bullet.position.y = -10000;
              bullet.velocity.x = 0;
              bullet.velocity.y = 0;
            });
          }, 100);

          const addEnemyBullet: (...args: any[]) => void = throttle((position: Vector, target: Vector) => {
            const bullet = new Bullet(
              { ...target },
              { ...position },
              { x: 10, y: 5 },
              10,
              10,
              '#ffffff',
              '#3377ff',
            );
            bullet.onTileHit(tileMap.tiles, (pos: Vector, angle: number) => {
              new ParticleSource(
                { x: pos.x, y: pos.y },
                { x: 5, y: 5 },
                { x: -5 * Math.cos(angle), y: -5 * Math.sin(angle) },
                '#ffffff',
                true,
                100,
                false,
                5,
                10,
                5,
                '#ffcc44',
              );

              bullet.position.x = -10000;
              bullet.position.y = -10000;
              bullet.velocity.x = 0;
              bullet.velocity.y = 0;
            });
            bullet.onMovableHit(
              person.stateEntity.position,
              person.stateEntity.size,
              {},
              (pos: Vector, angle: number) => {
              new ParticleSource(
                { x: pos.x, y: pos.y },
                { x: 5, y: 5 },
                { x: 5 * Math.cos(angle), y: 5 * Math.sin(angle) },
                '#aa0000',
                true,
                100,
                false,
                5,
                10,
                5,
              );

              bullet.position.x = -10000;
              bullet.position.y = -10000;
              bullet.velocity.x = 0;
              bullet.velocity.y = 0;
            });
          }, 100);

          person.stateEntity.update = (dt, stateEntity) => {
            if (state.controlState[Direction.LEFT] && !stateEntity.physicsState.leftWall) {
              stateEntity.physicsState.acceleration.x = -MOVE_ACCELERATION.x;
              person.changeState('move_left');
            }
            if (state.controlState[Direction.RIGHT] && !stateEntity.physicsState.rightWall) {
              stateEntity.physicsState.acceleration.x = MOVE_ACCELERATION.x;
              person.changeState('move_right');
            }
            if (!state.controlState[Direction.LEFT] && !state.controlState[Direction.RIGHT]) {
              stateEntity.physicsState.acceleration.x = 0;
              person.changeState('idle');
            }
            if (state.controlState[Direction.UP] && stateEntity.physicsState.onGround) {
              // stateEntity.physicsState.acceleration.y = -MOVE_ACCELERATION.y;
              stateEntity.physicsState.velocity.y = -MOVE_ACCELERATION.y;
            }
            if (!state.controlState[Direction.UP] && !stateEntity.physicsState.onGround && stateEntity.physicsState.velocity.y < 0) {
              // stateEntity.physicsState.acceleration.y = 0;
              stateEntity.physicsState.velocity.y += 5;
            }
            if (state.controlState[Controls.MOUSE_LEFT]) {
              addHeroBullet();
            }

            tilesCollision.track(stateEntity.physicsState, tileMap.tiles, dt);
            stateEntity.physicsState.acceleratedMotion(dt);
          };

          const enemy = new Enemy(
            person.stateEntity.physicsState.position,
            { x: 900, y: 450 },
            { x: 60, y: 60 },
            { x: 60, y: 60 },
            300,
            mediaStorage.getSource('enemy'),
            2,
          );

          enemy.onActiveRange((position, target, angleToTarget) => {
            addEnemyBullet(position, target);
          });
          enemy.onOutActiveRange(() => {});

          enemy.stateEntity.update = (dt, stateEntity) => {
            tilesCollision.track(stateEntity.physicsState, tileMap.tiles, dt);

            enemy.patrolling.horizontalPatrol(tileMap.tiles);
            enemy.aiming.aim();
            enemy.stateEntity.physicsState.acceleratedMotion(dt);
          }
        }
      }
    }
  );
}
