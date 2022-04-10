import { MediaStorageController } from '../../src/core/canvas/media/media-storage-controller';
import { setup } from '../../src//core/setup/setup';
import { StatefulObject } from '../../src/core/entity/stateful-object';
import { Direction } from '../../src/core/state/control/direction';

export function initGame() {
  const { canvas, state } = setup();
  const mediaStorage = new MediaStorageController();

  mediaStorage
    .loadSources({
      minion_idle: '../assets/minion_idle.png',
      minion_move_right: '../assets/minion_move.png',
      minion_move_left: '../assets/minion_move_left.png',
    })
    .subscribe(() => playGame());

  function playGame() {
    const person = new StatefulObject(
      { x: 400, y: 500 },
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

    person.onUpdate((dt, stateEntity) => {
      if (state.controlState[Direction.LEFT]) {
        stateEntity.velocity = { x: -10, y: 0 };
        person.changeState('move_left')
      }
      if (state.controlState[Direction.RIGHT]) {
        stateEntity.velocity = { x: 10, y: 0 };
        person.changeState('move_right')
      }
      if (!state.controlState[Direction.LEFT] && !state.controlState[Direction.RIGHT]) {
        stateEntity.velocity = { x: 0, y: 0 };
        person.changeState('idle')
      }


    })
  }
}
