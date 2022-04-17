import { Observable, fromEvent, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';
import { DIRECTIONS, Direction } from '../../interfaces/direction';

export class Control {
  public keydown$: Observable<Event>;
  public keyup$: Observable<Event>;
  public mouseDown$: Observable<Event>;
  public mouseUp$: Observable<Event>;

  constructor() {
    this.initializeSource();
  }

  public initializeSource(): void {
    this.keydown$ = fromEvent(document, 'keydown');
    this.keyup$ = fromEvent(document, 'keyup');
    this.mouseDown$ = fromEvent(document, 'mousedown');
    this.mouseUp$ = fromEvent(document, 'mouseup');
  }
}
