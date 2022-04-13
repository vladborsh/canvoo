import { StateController } from '../state/state-controller';
import { throttle } from '../utils/throttle';
import { Canvas } from './canvas';
import { AbstractRenderedEntity } from './rendered-entity/abstract-rendered-entity';

export class LoopController {
  public stop: boolean = false;
  public frameCount: number = 0;
  public fpsInterval: number;
  public startTime: number;
  public now: number;
  public then: number;
  public elapsed: number;

  private listeners: ((dt: number) => void)[] = [];

  constructor(public canvas: Canvas, public state: StateController) {}

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
        this.state.update(this.elapsed);
      }
      // animation stuff
      if (!!this.canvas) {
        this.canvas.context.clearRect(
          0,
          0,
          this.canvas.canvas.width,
          this.canvas.canvas.height
        );

        Object.values(this.canvas.renderedEntitiesStorage)
          .forEach((layer: AbstractRenderedEntity[]) => {
            layer.forEach(
              (renderedObject: AbstractRenderedEntity) => {
                renderedObject.render(this.elapsed);
              }
            )
          });
      }

      this.listeners.forEach(listener => listener(this.elapsed));
    }
  }

  public subscribe(listener: (dt: number) => void): void {
    this.listeners.push(throttle(listener, 1000));
  }
}
