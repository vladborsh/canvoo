import { Observable, Observer, from } from "rxjs";
import { concatMap, toArray, every, map } from "rxjs/operators";
import { each } from 'lodash'
import { MediaStorage } from "./media-storage";

export class MediaStorageController {
    public storage: MediaStorage;
    
    constructor() {
        this.storage = {}
    }
    
    public loadSources(pathList: string[]): Observable<MediaStorage>{
        return from(pathList)
            .pipe(
                concatMap(MediaStorageController.loadImage),
                toArray(),
                map( (imgList: HTMLImageElement[]) => {
                    each(imgList, (img: HTMLImageElement) => {
                        this.storage[img.src] = img;
                    })
                    return this.storage;
                }),
            )
    }
    
    static loadImage(path: string) {
        return Observable.create((observer: Observer<HTMLImageElement>) => {
            var img: HTMLImageElement = new Image();
            img.src = path;
            img.onload = () => {
                observer.next(img);
                observer.complete();
            };
            img.onerror = err => {
                observer.error(err);
            };
        });
    }
}



