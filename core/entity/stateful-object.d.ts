import { Canvas } from '../canvas/canvas';
import { AnimationSprite } from '../canvas/rendered-entity/animation-sprite';
import { Vector } from '../interfaces/vector';
import { StateController } from '../state/state-controller';
import { AbstractStateEntity } from '../state/state-entity/abstract-state-entity';
import { AbstractEntity } from './abstract-entity';
interface AnimatedEntityBlueprint {
    animationLength: number;
    frameDuration: number;
    image: HTMLImageElement;
    isBoomerang?: boolean;
    withBoundingBox?: boolean;
}
export declare class StatefulObject extends AbstractEntity {
    private state;
    private canvas;
    stateStore: Record<string, AnimationSprite>;
    activeStateName: string;
    activeState: AnimationSprite;
    update: (dt: number, stateEntity: AbstractStateEntity) => void;
    constructor(position: Vector, size: Vector, state: StateController, canvas: Canvas, states: Record<string, AnimatedEntityBlueprint>, defaultState: string, layer: number);
    changeState(newState: string): void;
}
export {};
