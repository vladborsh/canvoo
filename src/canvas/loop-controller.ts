import { each } from 'lodash';
import { StateController } from "../state/state-controller";
import { Canvas } from "./canvas";
import { AbstractRenderedEntity } from "./rendered-entity/abstract-rendered-entity";

export class LoopController {
    
    public stop: boolean;
    public frameCount: number;
    public fpsInterval: number; 
    public startTime: number;
    public now: number;
    public then: number;
    public elapsed: number;
    public state: StateController;
    public canvas: Canvas;

    constructor( canvas: Canvas, state: StateController ) {
        this.stop = false;
        this.frameCount = 0;
        this.state = state;
        this.canvas = canvas;
    }
    
    public startLoop(fps: number): void {
        this.then = Date.now();
        this.fpsInterval = 1000 / fps;
        this.startTime = this.then;
        this.loop();
    }

    public loop() {
        // stop
        if (this.stop) {
            return;
        }
        // request another frame
        requestAnimationFrame(this.loop.bind(this));
        // calc elapsed time since last loop
        this.now = Date.now();
        this.elapsed = this.now - this.then;
        // if enough time has elapsed, draw the next frame
        if (this.elapsed > this.fpsInterval) {
            // Get ready for next frame by setting then=now, but...
            // Also, adjust for fpsInterval not being multiple of 16.67
            this.then = this.now - (this.elapsed % this.fpsInterval);
            // state recalculation stuff
            if (!!this.state) {
                this.state.update();
            }
            // animation stuff
            if (!!this.canvas) {
                this.canvas.context.clearRect(0, 0, this.canvas.canvas.width, this.canvas.canvas.height);
                each( this.canvas.renderedEntitiesStorage, (renderedObject: AbstractRenderedEntity) => {
                    renderedObject.render();
                } ) ;

            }
        }
    }

}