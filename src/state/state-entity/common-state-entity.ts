import { AbstractStateEntity } from "./abstract-state-entity";
import { StateController } from "../state-controller";
import { Vector } from "../../space/vector";

export class CommonStateEntity extends AbstractStateEntity{

    constructor(id: string, stateController: StateController, position: Vector, size: Vector) {
        super(id, stateController, position, size);
    }

    update() { }
    
}