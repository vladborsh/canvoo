# Canvoo

Rendering easy to use engine that run full screen canvas and provide some rendering and animation stuff

## Installation 

```sh
npm install canvoo --save
yarn add canvoo
bower install canvoo --save
```

## Features

* 2d rendering
* User input capturing
* Media resource management
* State management

## Usage

Move forward gray cube

### Javascript

### TypeScript

Move forward cube

```typescript
import { defaultSetup, TestingCube } from "canvoo";

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
```

Cube controlled by keyboard

```typescript
import { Direction, defaultSetup, initializeControl, TestingCube } from "canvoo";

const state = {
    [Direction.UP] : false,
    [Direction.DOWN] : false,
    [Direction.LEFT] : false,
    [Direction.RIGHT] : false,
    cubeVelocity : {x: 0, y: 0}
}

function getVelocity() {
    const velocity = {x:0, y: 0}
    if (state[Direction.UP]) velocity.y += -1;
    if (state[Direction.DOWN]) velocity.y += 1;
    if (state[Direction.LEFT]) velocity.x += -1;
    if (state[Direction.RIGHT]) velocity.x += 1;
    return velocity;
}


function main():void {
    defaultSetup();
    let control = initializeControl();
    control.keydown$
        .subscribe( (dir: Direction) => {
            state[dir] = true;
        });
    control.keyup$
        .subscribe( (dir: Direction) => {
            state[dir] = false;
        });

    let obj = new TestingCube('cube', {x:50, y:50}, {x:50, y:50}, '#555');
    obj.update( function () {
        state.cubeVelocity = getVelocity();
        this.position.x += state.cubeVelocity.x;
        this.position.y += state.cubeVelocity.y;
    })
}

main();
```

## Testing

Open terminal and run next commands

```sh
npm i
npm run test
```