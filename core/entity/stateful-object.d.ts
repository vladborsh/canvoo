import { Canvas } from '../canvas/canvas';
import { AbstractRenderedEntity } from '../canvas/rendered-entity/abstract-rendered-entity';
import { AnimationSprite } from '../canvas/rendered-entity/animation-sprite';
import { Vector } from '../interfaces/vector';
import { StateController } from '../state/state-controller';
import { RectangleStateEntity } from '../state/state-entity/rectangle-state.entity';
interface AnimatedEntityBlueprint {
    animationLength: number;
    frameDuration: number;
    image: HTMLImageElement;
    isBoomerang?: boolean;
    withBoundingBox?: boolean;
}
export declare class StatefulObject {
    private state;
    private canvas;
    stateStore: Record<string, AnimationSprite>;
    activeStateName: string;
    activeState: AnimationSprite;
    stateEntity: RectangleStateEntity;
    renderedEntity: AbstractRenderedEntity;
    constructor(position: Vector, size: Vector, state: StateController, canvas: Canvas, states: Record<string, AnimatedEntityBlueprint>, defaultState: string, layer: number);
    changeState(newState: string): void;
}
export {};
