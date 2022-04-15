import { StateController } from '../state/state-controller';
import { Canvas } from './canvas';
export declare class LoopController {
    canvas: Canvas;
    state: StateController;
    stop: boolean;
    frameCount: number;
    fpsInterval: number;
    startTime: number;
    now: number;
    then: number;
    elapsed: number;
    private listeners;
    constructor(canvas: Canvas, state: StateController);
    startLoop(): void;
    stopLoop(): void;
    loop(): void;
    subscribe(listener: (dt: number) => void): void;
}
