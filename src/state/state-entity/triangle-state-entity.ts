import { AbstractStateEntity } from "./abstract-state-entity";
import { StateController } from "../state-controller";
import { Vector } from "../../space/vector";
import { calculateCenter } from "../../utils/calc";

export class TriangleStateEntity extends AbstractStateEntity{

    public points: Vector[];

    constructor(id: string, stateController: StateController, p1: Vector, p2: Vector, p3: Vector) {
        super(id, stateController, calculateCenter(p1, p2, p3));
        this.points = [p1, p2, p3];
    }

    update() { }
    
}