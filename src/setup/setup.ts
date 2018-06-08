import { patchWindowCanvas, patchWindowStateController } from "./patch-window";
import { Canvas } from "../canvas/canvas";
import { StateController } from "../state/state-controller";
import { LoopController } from "../canvas/loop-controller";

export function defaultSetup() {
    let canvas = new Canvas();
    let state = new StateController();
    let loopController = new LoopController(canvas, state);
    patchWindowCanvas(canvas);
    patchWindowStateController(state);
    loopController.startLoop(20);
}
