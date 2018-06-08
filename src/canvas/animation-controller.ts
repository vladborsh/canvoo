import { AnimationProcedureStorage } from "./animation-procedure-storage";
import { each } from 'lodash';

export class AnimationController {
    
    public stop: boolean;
    public frameCount: number;
    public fpsInterval: number; 
    public startTime: number;
    public now: number;
    public then: number;
    public elapsed: number;

    constructor(private animationProcedureStorage: AnimationProcedureStorage) {
        this.stop = false;
        this.frameCount = 0;
    }

    public startLoop(fps) {
        this.fpsInterval = 1000 / fps;
        this.then = Date.now();
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
            // animation stuff
            this.animationProcedureStorage.render();
        }
    }

}