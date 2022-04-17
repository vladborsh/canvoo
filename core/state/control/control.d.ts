import { Observable } from 'rxjs';
export declare class Control {
    keydown$: Observable<Event>;
    keyup$: Observable<Event>;
    mouseDown$: Observable<Event>;
    mouseUp$: Observable<Event>;
    constructor();
    initializeSource(): void;
}
