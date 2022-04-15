import { Observable } from "rxjs";
import { MediaStorage } from "./media-storage";
export declare class MediaStorageController {
    storage: MediaStorage;
    loadSources(pathRecord: Record<string, string>): Observable<MediaStorage>;
    getSource(key: string): HTMLImageElement;
    private uploadImage;
    private static loadImage;
}
