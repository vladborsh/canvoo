import { Observable, Observer, from, AsyncSubject, pipe, UnaryFunction } from "rxjs";
import { concatMap, toArray, every, map } from "rxjs/operators";
import { each } from 'lodash'
import { MediaStorage } from "./media-storage";

export class MediaStorageController {
    public storage: MediaStorage = {}
    
    public loadSources(pathRecord: Record<string, string>): Observable<MediaStorage>{
        return from(Object.entries(pathRecord))
            .pipe(this.uploadImage())
    }

    public getSource(key: string): HTMLImageElement {
        return this.storage[key];
    }

    private uploadImage(): UnaryFunction<Observable<[string, string]>, any> {
        return pipe(
            concatMap(MediaStorageController.loadImage),
            toArray(),
            map((imgList: [string, HTMLImageElement][]) => {
                each(imgList, ([key, img]: [string, HTMLImageElement]) => {
                    this.storage[key] = img;
                })

                console.log(this.storage)
                return this.storage;
            }),
        )
    }
    
    
    private static loadImage([key, path]: [string, string]) {
        return Observable.create((observer: Observer<[string, HTMLImageElement]>) => {
            var img: HTMLImageElement = new Image();
            img.src = path;
            img.onload = () => {
                observer.next([key, img]);
                observer.complete();
            };
            img.onerror = err => {
                observer.error(err);
            };
        });
    }
}



