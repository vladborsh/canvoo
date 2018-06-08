import { defaultSetup } from "./setup/setup";
import { TestingCube } from "./entity/testing-cube";

function main():void {
    defaultSetup();
    let obj = new TestingCube('cube', {x:50, y:50}, {x:50, y:50}, '#555');
    obj.update( function () {
        if ( this.position.x < 200) {
            this.position.x++;
        }
    })
}

main();