import { AbstractEntity } from "./abstract-entity";
import { Vector } from "../space/vector";

export class TestingCube extends AbstractEntity {

    position: Vector;
    size: Vector;

    constructor(id: string, position: Vector, size: Vector, color?: string) {
        super(id, position, size, color );
        this.position = position;
        this.size = size;
    }
}