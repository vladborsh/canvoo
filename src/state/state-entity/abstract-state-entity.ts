import { Vector } from "../../space/point";
import { StateController } from "../state-controller";

export abstract class AbstractStateEntity {

    public id: string;
    public state: StateController;
    public size: Vector;
    public position: Vector;
    
    constructor(id: string, state: StateController, position?: Vector, size?: Vector ) {
        this.id = id;
        this.state = state;
        this.size = size ? size : {x:0, y:0};
        this.position = position ? position : {x:0, y:0};
    }

    destroy() {
        this.state.destroy(this.id);
    }

    abstract update();

}