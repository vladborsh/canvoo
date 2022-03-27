import { TestingCube } from "./entity/testing-cube";
import { setup } from "./setup/setup";
import { Vector } from "./space/vector";
import { Direction } from "./state/control/direction";
import { AbstractEntity } from "./entity/abstract-entity";
import { AbstractStateEntity } from "./state/state-entity/abstract-state-entity";
import { isSmall, multiply, sum } from "./utils/calc";


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

        stateEntity.velocity = sum(stateEntity.velocity, multiply(freeAcceleration, dt))
        stateEntity.position = sum(stateEntity.position, stateEntity.velocity)
    };
})())

