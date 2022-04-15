import { initial } from "lodash";
import { Canvas } from "../canvas/canvas";
import { LoopController } from "../canvas/loop-controller";
import { MediaStorageController } from "../canvas/media/media-storage-controller";
import { StateController } from "../state/state-controller";

export interface StateBlueprint {
  init: (canvas: Canvas, stateController: StateController, mediaStorageController: MediaStorageController) => void;
  destroy?: (canvas: Canvas, stateController: StateController) => void;
  withCanvas: boolean;
}

export class CommonState {
  public activeState: StateBlueprint;
  private mediaStorageController: MediaStorageController;

  constructor(
    private canvas: Canvas,
    private stateController: StateController,
    private loopController: LoopController,
    mediaSources: Record<string, string>,
    initialSetup: () => void,
    defaultState: string,
    private states: Record<string, StateBlueprint>,
  ) {
    this.mediaStorageController = new MediaStorageController();

    this.mediaStorageController
      .loadSources(mediaSources)
      .subscribe(() => {
        initialSetup();
        this.activeState = states[defaultState];
        this.activeState.init(this.canvas, this.stateController, this.mediaStorageController);
        if (this.activeState.withCanvas) {
          this.loopController.startLoop();
        }
      })
  }

  public changeState(state: string): void {
    if (!this.states[state]) {
      return;
    }
    this.loopController.stopLoop();
    this.activeState.destroy(this.canvas, this.stateController);
    this.activeState = this.states[state];
    this.activeState.init(this.canvas, this.stateController, this.mediaStorageController);
    if (this.activeState.withCanvas) {
      this.loopController.startLoop();
    }
  }
}
