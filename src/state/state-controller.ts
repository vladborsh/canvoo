import { AbstractStateEntity } from "./state-entity/abstract-state-entity";
import { each, findIndex } from 'lodash';
import { Control } from "./control/control";
import { Direction } from "./control/direction";

export class StateController {

    public entities: AbstractStateEntity[];
    public readonly controlState: {}; 

    constructor() {
        this.entities = [];
        this.controlState = {
            [Direction.UP] : false,
            [Direction.DOWN] : false,
            [Direction.LEFT] : false,
            [Direction.RIGHT] : false,
        }
        let control = new Control();
        control.keydown$
            .subscribe( (dir: Direction) => this.controlState[dir] = true );
        control.keyup$
            .subscribe( (dir: Direction) => this.controlState[dir] = false );

    }

    public addEntity(entity: AbstractStateEntity) {
        entity.stateController = this;
        this.entities.push(entity);
    }

    public destroy(id: string): void {
        this.entities.splice(
            findIndex( this.entities, (entity: AbstractStateEntity) => {
                return entity.id === id;
            }), 1);
    }

    public update(): void {
        each(this.entities, (entity: AbstractStateEntity) => {
            entity.update();
        })
    }

}