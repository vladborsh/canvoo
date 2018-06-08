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

### Javascript
```javascript
import { defaultSetup } from "canvoo";

function main() {
    defaultSetup();
    window.drawRect('#333', {x:40,y:40}, {x:40,y:40});
}

main();
```

### TypeScript

Move forward gray cube

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