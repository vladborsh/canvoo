import { Vector } from "../space/point";
import { AnimationProcedureStorage } from "./animation-procedure-storage";
import { AnimationController } from './animation-controller';
import { MediaStorageController } from "./media/media-storage-controller";
import { Observable } from "rxjs";
import { MediaStorage } from "./media/media-storage";

export class Canvas {

    public canvas: HTMLCanvasElement;
    public context: CanvasRenderingContext2D;
    public canvasCenter: Vector;
    public canvasStorage: AnimationProcedureStorage;
    public animationController: AnimationController;
    public mediaStorageController: MediaStorageController;
    public mediaStorage$: Observable<MediaStorage>

    constructor(pathList?: string[]) {
        this.createCanvas();
        this.canvasStorage = new AnimationProcedureStorage();
        this.animationController = new AnimationController(this.canvasStorage);
        this.mediaStorageController = new MediaStorageController();
        this.mediaStorage$ = this.mediaStorageController.loadSources(pathList);
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

    public drawRect( color: string, position: Vector, size: Vector ): void {
        this.context.fillStyle = color;
        this.context.fillRect(position.x, position.y, size.x, size.y);
    }

    public drawImage( image: HTMLImageElement, position: Vector, size?: Vector ) {
        if (!!size) {
            this.context.drawImage(image, position.x, position.y, size.x, size.y);
        }
        this.context.drawImage(image, position.x, position.y);
    }

}