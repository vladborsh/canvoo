import { Canvas } from "../canvas/canvas";
import { StateController } from "../state/state-controller";

export function patchWindowCanvas(canvas: Canvas) {
    (<any>window).canvas = canvas;
    console.log('canvas patched');
}

export function patchWindowStateController(state: StateController) {
    (<any>window).state = state;
    console.log('state patched');
}
