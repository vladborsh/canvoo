import { Canvas } from "../canvas/canvas";

export function patch(canvas: Canvas) {
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
}
