import { Collider } from "../interfaces/collider";
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
    tiles: Collider[];
    constructor(map: string[][], blockSamples: Record<string, BlockBlueprint>, tileSize: Vector);
    generate(): void;
}
