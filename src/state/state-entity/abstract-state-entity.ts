import { Vector } from "../../space/vector";
import { StateController } from "../state-controller";

export class AbstractStateEntity {

    public id: string;
    public stateController: StateController;
    public readonly controlState: {};
    public size: Vector;
    public position: Vector;
    public velocity: Vector = { x: 0, y: 0 };
    public update: (dt: number) => void;
    
    constructor(id: string, stateController: StateController, position?: Vector, size?: Vector ) {
        this.id = id;
        this.stateController = stateController;
        this.controlState = stateController.controlState;
        this.size = size ? size : {x:0, y:0};
        this.position = position ? position : {x:0, y:0};
    }

    destroy() {
        this.stateController.destroy(this.id);
    }

    public onUpdate( func: (dt: number, stateEntity: AbstractStateEntity) => void ) {
        this.update = (dt: number) => func(dt, this);
    }
}