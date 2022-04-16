import { Vector } from 'src/core/interfaces/vector';
import { generateUuid } from '../../utils/generate-uuid';
import { Canvas } from '../canvas';

export abstract class AbstractRenderedEntity {
  public readonly id = generateUuid();
  public render: (dt: number) => void;

  constructor(
    public canvas: Canvas,
    public size: Vector,
    public layer: number,
  ) {}

  destroy() {
    this.canvas.destroy(this.layer, this.id);
  }

  onRender(func: (dt: number, entity: AbstractRenderedEntity) => void) {
    this.render = (dt: number) => {
      func(dt, this);
    }
  }
}
