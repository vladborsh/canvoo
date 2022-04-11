import { Observable, fromEvent, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators'
import { DIRECTIONS, Direction } from '../../interfaces/direction';

export class Control {

    private mapper: OperatorFunction<KeyboardEvent, Direction>;
    public keydown$: Observable<Direction>;
    public keyup$: Observable<Direction>;

    constructor() {
        this.initializeSource();
    }

    public initializeSource(): void {
        this.mapper = map((event: KeyboardEvent) => {
            return DIRECTIONS[event.keyCode]
        })
        this.keydown$ = fromEvent(document, 'keydown').pipe(this.mapper);
        this.keyup$ = fromEvent(document, 'keyup').pipe(this.mapper);
    }

}
