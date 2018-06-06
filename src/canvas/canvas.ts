import { Vector } from "../space/point";
import { CanvasStorage } from "./canvas-storage";
import { Animation } from './animation';

export class Canvas {

    public canvas: HTMLCanvasElement;
    public context: CanvasRenderingContext2D;
    public canvasCenter: Vector;
    public canvasStorage: CanvasStorage;
    public animation: Animation;

    constructor() {
        this.createCanvas();
        this.patch();
        this.canvasStorage = new CanvasStorage();
        this.animation = new Animation(this.canvasStorage);
        this.animationLoop();
    }

    public createCanvas(w?: number, h?: number): void {
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        this.canvas.width = w || window.innerWidth;
        this.canvas.height = h || window.innerHeight;
        document.body.style.margin = '0 0 0 0';
        this.canvasCenter = {
            x: this.canvas.width / 2,
            y: this.canvas.height / 2,
        }
        document.body.appendChild(this.canvas);
    }

    public animationLoop() {
        this.animation.startAnimating(4);
    }

    public drawRect( color: string, position: Vector, size: Vector ): void {
        this.context.fillStyle = color;
        this.context.fillRect(position.x, position.y, size.x, size.y);
    }

    public patch() {
        const self = this;
        (<any>window).drawRect = function () {
            const arg = arguments;
            const patch = () => {
                self.drawRect.apply(self, arg);
            }
            self.canvasStorage.push(patch);
        };
    }

}