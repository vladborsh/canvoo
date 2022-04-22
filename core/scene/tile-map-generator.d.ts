import { Block } from "../interfaces/block";
import { Vector } from "../interfaces/vector";
export interface BlockBlueprint {
    layer: number;
    image: HTMLImageElement;
    isAnimation?: boolean;
    animationLength?: number;
    frameDuration?: number;
    isBlock: boolean;
}
export declare class TileMapGenerator {
    map: string[][];
    blockSamples: Record<string, BlockBlueprint>;
    tileSize: Vector;
    tiles: Block[];
    constructor(map: string[][], blockSamples: Record<string, BlockBlueprint>, tileSize: Vector);
    generate(): void;
}
