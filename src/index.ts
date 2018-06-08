import { defaultSetup } from "./setup/setup";

function main():void {
    defaultSetup();
    (<any>window).drawRect('#333', {x:40,y:40}, {x:40,y:40});
}

main();