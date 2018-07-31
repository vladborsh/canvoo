import { calculateCenter } from "../utils/calc";
import { AbstractEntity } from "..";
import { TriangleStateEntity } from "../state/state-entity/triangle-state-entity";
import { TriangleEntity } from "../canvas/rendered-entity/triangle-entity";
import { Vector } from "../space/vector";

export class Triangle extends AbstractEntity {

    constructor(id: string, color: string, p1: Vector, p2: Vector, p3: Vector) {
        super(id, calculateCenter(p1, p2, p3));
        this.stateEntity = new TriangleStateEntity(id, (<any>window).state, p1, p2, p3);
        this.renderedEntity = new TriangleEntity(id, (<any>window).canvas, color, p1, p2, p3);
    }
}