import { patchWindowCanvas, patchWindowStateController } from "./patch-window";
import { Canvas } from "../canvas/canvas";
import { StateController } from "../state/state-controller";
import { LoopController } from "../canvas/loop-controller";

export function setup() {
    let canvas = new Canvas();
    let state = new StateController();
    let loopController = new LoopController(canvas, state);

    patchWindowCanvas(canvas);
    patchWindowStateController(state);

    return { canvas, state, loopController };
}
