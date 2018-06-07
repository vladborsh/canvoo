import { Observable, fromEvent } from 'rxjs';
import { map } from 'rxjs/operators'
import { DIRECTIONS, Direction } from './direction';

export function initializeControl(): Observable<Direction> {
    let control = new Control();
    return control.getDirection();
}

export class Control {
    
    private keydown$: Observable<{}>;
    
    constructor() {
        this.initializeSource();
    }

    public initializeSource(): void {
        this.keydown$ = fromEvent(document, 'keydown');
    }

    public getDirection(): Observable<Direction> {
        return this.keydown$
            .pipe(
                map((event: KeyboardEvent) => {
                    return DIRECTIONS[event.keyCode]
                })
            )
    }
    
} 