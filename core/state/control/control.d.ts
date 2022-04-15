import { Observable } from 'rxjs';
import { Direction } from '../../interfaces/direction';
export declare class Control {
    private mapper;
    keydown$: Observable<Direction>;
    keyup$: Observable<Direction>;
    constructor();
    initializeSource(): void;
}
