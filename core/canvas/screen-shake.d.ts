import { Canvas } from "./canvas";
export declare class ScreenShake {
    private canvas;
    private shake;
    private isShakeEnabled;
    private isUpDirection;
    constructor(canvas: Canvas);
    addShake(): void;
    render(): void;
}
