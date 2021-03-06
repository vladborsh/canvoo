import { Vector } from "../space/vector";
import { MediaStorageController } from "./media/media-storage-controller";
import { Observable } from "rxjs";
import { MediaStorage } from "./media/media-storage";
import { RectangleEntity } from "./rendered-entity/rectangle-entity";
import { AbstractRenderedEntity } from "./rendered-entity/abstract-rendered-entity";
import { findIndex } from 'lodash';

export class Canvas {

    public canvas: HTMLCanvasElement;
    public context: CanvasRenderingContext2D;
    public canvasCenter: Vector;
    public mediaStorageController: MediaStorageController;
    public mediaStorage$: Observable<MediaStorage>;
    public renderedEntitiesStorage: AbstractRenderedEntity[];

    constructor(pathList?: string[]) {
        this.createCanvas();
        this.mediaStorageController = new MediaStorageController();
        if (pathList) {
            this.mediaStorage$ = this.mediaStorageController.loadSources(pathList);
        }
        this.renderedEntitiesStorage = [];
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

    public addEntity( abstractRenderedEntity: AbstractRenderedEntity): void {
        this.renderedEntitiesStorage.push(abstractRenderedEntity);
    }

    public destroy(id: string) {
        this.renderedEntitiesStorage.splice(
            findIndex( this.renderedEntitiesStorage, (entity: AbstractRenderedEntity) => {
                return entity.id === id;
            }), 1);
    }

    public drawRectangleObject( rectangleObject: RectangleEntity ): void {
        rectangleObject.render();
    }

    public drawRect( color: string, position: Vector, size: Vector ): void {
        this.context.fillStyle = color;
        this.context.fillRect( position.x, position.y, size.x, size.y, );
    }

    public drawImage( image: HTMLImageElement, position: Vector, size?: Vector ): void {
        if (!!size) {
            this.context.drawImage(image, position.x, position.y, size.x, size.y);
        }
        this.context.drawImage(image, position.x, position.y);
    }

    public drawText( text: string, 
                    x: number, 
                    y: number, 
                    fillStyle: string,
                    fontSize: number, 
                    horizontalAlign: string = 'center', 
                    verticalAlign: string = 'middle' ) {

        this.context.fillStyle = fillStyle;
        this.context.font = `bold ${fontSize}px sans-serif`;

        this.context.textAlign = horizontalAlign;
        this.context.textBaseline = verticalAlign;

        this.context.fillText(text, x, y);
      }

    public set mediaSources(sources: string[]) {
        this.mediaSources = sources;
    }

}