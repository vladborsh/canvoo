import { Canvas } from "./canvas";

const SHAKE_AMPLITUDE = 6;

export class ScreenShake {
  private shake = 0;
  private isShakeEnabled = false;
  private isUpDirection = false;

  constructor(private canvas: Canvas) {}

  public addShake(): void {
    if (!this.isShakeEnabled) {
      this.isShakeEnabled = true;
      this.isUpDirection = false;
      this.shake = SHAKE_AMPLITUDE;
    }
  }

  render(): void {
    if (!this.isShakeEnabled) {
      return;
    }

    if (this.shake > 0) {
      this.canvas.context.translate(0, this.isUpDirection ? this.shake : -this.shake);
      this.shake--;
      this.isUpDirection = !this.isUpDirection;
    } else {
      this.isShakeEnabled = false;
    }
  }

}
