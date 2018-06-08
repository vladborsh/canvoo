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

```javascript
import { defaultSetup } from "./setup/setup";
import { TestingCube } from "./entity/testing-cube";

function main() {
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

### TypeScript

```typescript
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
```

## Testing

Open terminal and run next commands

```sh
npm i
npm run test
```