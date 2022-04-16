import { Observable } from 'rxjs';
export declare class Control {
    keydown$: Observable<Event>;
    keyup$: Observable<Event>;
    constructor();
    initializeSource(): void;
}
