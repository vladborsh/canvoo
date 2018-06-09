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

Cube controlled from keyboard

```typescript
import { defaultSetup, TestingCube } from "canvoo";

const VELOCITY_STEP = 5;

function main():void {
    defaultSetup();
    let obj = new TestingCube('cube', {x:50, y:50}, {x:50, y:50}, '#555');
    obj.update( function () {
        const velocity = {x:0, y: 0}
        if (this.controlState[Direction.UP]) velocity.y += -VELOCITY_STEP;
        if (this.controlState[Direction.DOWN]) velocity.y += VELOCITY_STEP;
        if (this.controlState[Direction.LEFT]) velocity.x += -VELOCITY_STEP;
        if (this.controlState[Direction.RIGHT]) velocity.x += VELOCITY_STEP;
        this.position.x += velocity.x;
        this.position.y += velocity.y;
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