import { AbstractStateEntity } from "./abstract-state-entity";
import { StateController } from "../state-controller";
import { Vector } from "../../space/vector";

export class CommonStateEntity extends AbstractStateEntity{

    constructor(id: string, state: StateController, position: Vector, size: Vector) {
        super(id, state, position, size);
    }

    update() { }
    
}