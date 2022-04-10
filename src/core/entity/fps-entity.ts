import { Canvas } from "../canvas/canvas";
import { LoopController } from "../canvas/loop-controller";
import { TextRenderedEntity } from "../canvas/rendered-entity/text-rendered-entity";
import { TextEntity } from "./text-entity";

export class FpsEntity {
  constructor(
    canvas: Canvas,
    loopController: LoopController,
  ) {
    const textEntity = new TextEntity(
      'test',
      { x: canvas.canvas.width - 100, y: canvas.canvas.height - 20 },
      { x: 0, y: 0 },
      '#222222',
      20,
      1000,
    );

    loopController.subscribe(dt => {
      (<TextRenderedEntity>textEntity.renderedEntity).text = `${Math.round(1000/dt)} fps`
    });
  }
}
