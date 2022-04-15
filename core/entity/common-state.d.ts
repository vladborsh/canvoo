import { Canvas } from "../canvas/canvas";
import { LoopController } from "../canvas/loop-controller";
import { MediaStorageController } from "../canvas/media/media-storage-controller";
import { StateController } from "../state/state-controller";
export interface StateBlueprint {
    init: (canvas: Canvas, stateController: StateController, mediaStorageController: MediaStorageController) => void;
    destroy?: (canvas: Canvas, stateController: StateController) => void;
    withCanvas: boolean;
}
export declare class CommonState {
    private canvas;
    private stateController;
    private loopController;
    private states;
    activeState: StateBlueprint;
    private mediaStorageController;
    constructor(canvas: Canvas, stateController: StateController, loopController: LoopController, mediaSources: Record<string, string>, initialSetup: () => void, defaultState: string, states: Record<string, StateBlueprint>);
    changeState(state: string): void;
}
