import { LoopController } from "../canvas/loop-controller";
import { AbstractEntity } from "../entity/abstract-entity";
import { forEach } from 'lodash';

export function start() {
    let loopController = new LoopController((<any>window).canvas, (<any>window).state);
    (<any>window)['abstract_entity_storage'].forEach( (entity: AbstractEntity) => {
        entity.bind((<any>window).state, (<any>window).canvas);
        console.log(entity);
    });
    loopController.startLoop(60);
}