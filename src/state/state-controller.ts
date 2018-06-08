import { AbstractStateEntity } from "./state-entity/abstract-state-entity";
import { each, findIndex } from 'lodash';

export class StateController {

    public entities: AbstractStateEntity[];

    constructor() {
        this.entities = [];
    }

    public addEntity(entity: AbstractStateEntity) {
        entity.state = this;
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