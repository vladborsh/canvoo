export class CanvasStorage {

    public animations: Array<Function>;
    
    constructor() {
        this.animations = []
    }

    public push(animationFunc : Function): void {
        this.animations.push(animationFunc);
    }
}