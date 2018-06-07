import { each } from 'lodash';

export class AnimationProcedureStorage {

    public animations: Array<Function>;
    
    constructor() {
        this.animations = []
    }

    public push(animationFunc : Function): void {
        this.animations.push(animationFunc);
    }

    public render() {
        each( this.animations, animation => {
            animation();
        } );
    }
}