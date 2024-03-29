import { Vector } from "src/core/interfaces/vector";
import { Canvas } from "../canvas";
import { AbstractRenderedEntity } from "./abstract-rendered-entity";

export class TextRenderedEntity implements AbstractRenderedEntity {
  public isActive = true;

  constructor(
    public canvas: Canvas,
    public text: string,
    public position: Vector,
    public fillStyle: string,
    public fontSize: number,
    public layer: number,
    public horizontalAlign: CanvasTextAlign = 'center',
    public verticalAlign: CanvasTextBaseline = 'middle',
  ) {}

  public render() {
    this.canvas.context.fillStyle = this.fillStyle;
    this.canvas.context.font = `bold ${this.fontSize}px Arial`;

    this.canvas.context.textAlign = this.horizontalAlign;
    this.canvas.context.textBaseline = this.verticalAlign;

    this.canvas.context.fillText(this.text, this.position.x, this.position.y);


    this.canvas.context.strokeStyle = '#ffffff';
    this.canvas.context.strokeText(this.text, this.position.x, this.position.y);
    this.canvas.context.fill();
    this.canvas.context.stroke();
  }
}
