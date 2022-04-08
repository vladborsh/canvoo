import { Vector } from "src/core/interfaces/vector";
import { AbstractStateEntity } from "src/core/state/state-entity/abstract-state-entity";
import { Canvas } from "../canvas";
import { AbstractRenderedEntity } from "./abstract-rendered-entity";

export class Sprite extends AbstractRenderedEntity {
    private currentFrame = 0;
    private elapsedTimeBetweenFrames = 0;

    constructor(
        public id: string,
        public canvas: Canvas,
        private stateEntity: AbstractStateEntity,
        private frameSize: Vector,
        private animationLength: number,
        private frameDuration: number,
        private image: HTMLImageElement,
    ) {
        super(id, canvas);
    }

    public render(dt: number) {
        console.log(dt)
        
        this.canvas.context.drawImage(
            this.image,
            this.currentFrame * this.frameSize.x,
            0,
            this.frameSize.x,
            this.frameSize.y,
            this.stateEntity.position.x,
            this.stateEntity.position.y,
            this.frameSize.x,
            this.frameSize.y
        );

        this.elapsedTimeBetweenFrames += dt;
        
        if (this.elapsedTimeBetweenFrames > this.frameDuration) {
            this.currentFrame++;
            this.elapsedTimeBetweenFrames = 0;
        }

        if (this.currentFrame == this.animationLength) {
            this.currentFrame = 0;
        }
    }
}