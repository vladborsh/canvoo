import { patchWindowCanvas, patchWindowStateController } from "./patch-window";
import { Canvas } from "../canvas/canvas";
import { StateController } from "../state/state-controller";
import { LoopController } from "../canvas/loop-controller";

export function defaultSetup() {
    let canvas = new Canvas();
    let state = new StateController();
    patchWindowCanvas(canvas);
    patchWindowStateController(state);
}
