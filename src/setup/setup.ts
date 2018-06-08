import { patchWindow } from "./patch-window";
import { Canvas } from "../canvas/canvas";

export function defaultSetup() {
    let canvas = new Canvas();
    patchWindow(canvas);
    canvas.animationController.startLoop(20);
}
