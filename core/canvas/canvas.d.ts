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
    private screenShake;
    constructor();
    createCanvas(w?: number, h?: number): void;
    addShake(): void;
    clear(): void;
    render(dt: number): void;
    addEntity(abstractRenderedEntity: AbstractRenderedEntity): void;
}
