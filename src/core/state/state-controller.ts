import { AbstractStateEntity } from './state-entity/abstract-state-entity';
import { each, findIndex } from 'lodash';
import { Control } from './control/control';
import { Direction, DIRECTIONS } from '../interfaces/direction';
import { filter, map } from 'rxjs/operators';

export enum ControlButton {
  SPACE = 'SPACE',
}

export class StateController {
  public entities: AbstractStateEntity[];
  public readonly controlState: Record<string, boolean>;

  constructor() {
    this.entities = [];
    this.controlState = {
      [Direction.UP]: false,
      [Direction.DOWN]: false,
      [Direction.LEFT]: false,
      [Direction.RIGHT]: false,
      [ControlButton.SPACE]: false,
    };
    let control = new Control();
    control.keydown$
      .pipe(map((event: KeyboardEvent) => event.key), filter(key => key === ' '))
      .subscribe(() => this.controlState[ControlButton.SPACE] = true);
    control.keyup$
      .pipe(map((event: KeyboardEvent) => event.key), filter(key => key === ' '))
      .subscribe(() => this.controlState[ControlButton.SPACE] = false);

    control.keydown$
      .pipe(map((event: KeyboardEvent) => DIRECTIONS[event.keyCode]))
      .subscribe((dir: Direction) => (this.controlState[dir] = true));
    control.keyup$
      .pipe(map((event: KeyboardEvent) => DIRECTIONS[event.keyCode]))
      .subscribe((dir: Direction) => (this.controlState[dir] = false));
  }

  public addEntity(entity: AbstractStateEntity) {
    entity.stateController = this;
    this.entities.push(entity);
  }

  public destroy(id: string): void {
    this.entities.splice(
      findIndex(this.entities, (entity: AbstractStateEntity) => entity.id === id),
      1
    );
  }

  public update(dt: number): void {
    each(this.entities, (entity: AbstractStateEntity) => {
      if (!entity.update) {
        return;
      }
      entity.update(dt);
    });
  }
}
