import { Vector } from '../interfaces/vector';
import { Observable } from 'rxjs';
import { MediaStorage } from './media/media-storage';
import { AbstractRenderedEntity } from './rendered-entity/abstract-rendered-entity';
export declare class Canvas {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    mediaStorage$: Observable<MediaStorage>;
    renderedEntitiesStorage: Record<number, AbstractRenderedEntity[]>;
    cameraPosition: Vector;
    canvasHalfSize: Vector;
    constructor();
    createCanvas(w?: number, h?: number): void;
    addEntity(abstractRenderedEntity: AbstractRenderedEntity): void;
    destroy(layer: number, id: string): void;
}
