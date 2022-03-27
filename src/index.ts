import { TestingCube } from "./core/entity/testing-cube";
import { setup } from "./core/setup/setup";
import { Vector } from "./core/space/vector";
import { Direction } from "./core/state/control/direction";
import { AbstractStateEntity } from "./core/state/state-entity/abstract-state-entity";
import { multiply, sum } from "./core/utils/calc";


const {canvas, state} = setup();

const cube = new TestingCube('qwef', { x: 100, y: 100 }, { x: 30, y: 30 }, '#333333');
cube.register(state, canvas);

cube.onUpdate((() => {
    const jumpVelocity: Vector = { x: 0, y: -11 };
    const freeAcceleration: Vector = { x: 0, y: 10 };

    return (dt: number, stateEntity: AbstractStateEntity) => {
        if (state.controlState[Direction.UP]) {
            stateEntity.velocity = jumpVelocity;
        }

        stateEntity.velocity = sum(stateEntity.velocity, multiply(freeAcceleration, dt/1000))
        stateEntity.position = sum(stateEntity.position, multiply(stateEntity.velocity, dt/100))
    };
})())

