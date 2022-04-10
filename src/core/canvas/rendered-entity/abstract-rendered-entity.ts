import { generateUuid } from '../../utils/generate-uuid';
import { Canvas } from '../canvas';

export abstract class AbstractRenderedEntity {
  public readonly id = generateUuid();

  constructor(
    public canvas: Canvas,
    public layer: number,
  ) {}

  destroy() {
    this.canvas.destroy(this.layer, this.id);
  }

  abstract render(dt: number): void;
}
