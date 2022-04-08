import { TestingCube } from "./core/entity/testing-cube";
import { setup } from "./core/setup/setup";
import { Vector } from "./core/interfaces/vector";
import { Direction } from "./core/state/control/direction";
import { AbstractStateEntity } from "./core/state/state-entity/abstract-state-entity";
import { multiply, sum } from "./core/utils/calc";
import { intersect } from "./core/utils/physics";


const {canvas, state} = setup();

const cube = new TestingCube('qwef', { x: 100, y: 100 }, { x: 50, y: 50 }, '#333333');

const panels = [];

const panel = new TestingCube('qw15326f', { x: 600, y: 90 }, { x: 50, y: 200 }, '#666666');

const jumpVelocity: Vector = { x: 0, y: -40 };
const freeAcceleration: Vector = { x: 0, y: 100 };

let ACTIVE = true;

cube.onUpdate((() => {
    return (dt: number, stateEntity: AbstractStateEntity) => {
        if (!ACTIVE) {
            return;
        }

        if (state.controlState[Direction.UP]) {
            stateEntity.velocity = jumpVelocity;
        }

        stateEntity.velocity = sum(stateEntity.velocity, multiply(freeAcceleration, dt/1000))
        stateEntity.position = sum(stateEntity.position, multiply(stateEntity.velocity, dt/100));

        if (intersect(cube.stateEntity.position, cube.stateEntity.size, panel.stateEntity.position, panel.stateEntity.size)) {
            ACTIVE = false;
        }
    };
})());

panel.onUpdate((() => {
    panel.stateEntity.velocity = { x: -10, y: 0 };

    return (dt: number, stateEntity: AbstractStateEntity) => {
        if (!ACTIVE) {
            return;
        }

        stateEntity.position = sum(stateEntity.position, multiply(stateEntity.velocity, dt/100));

        if ((stateEntity.position.x + stateEntity.size.x) < 0) {
            stateEntity.position.x = canvas.canvas.width;
        }
    };
})());

cube.register(state, canvas);
panel.register(state, canvas);
