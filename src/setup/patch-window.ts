import { Canvas } from "../canvas/canvas";

export function patchWindow(canvas: Canvas) {
    (<any>window).canvas = canvas;
    (<any>window).drawRect = function () {
        const arg = arguments;
        canvas.canvasStorage.push(() => {
            canvas.drawRect.apply(canvas, arg);
        });
    };
    (<any>window).drawImage = function () {
        const arg = arguments;
        canvas.canvasStorage.push(() => {
            canvas.drawImage.apply(canvas, arg);
        });
    }; 
    console.log('patched');
}
