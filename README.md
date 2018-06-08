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
```typescript
import { defaultSetup } from "canvoo";

function main():void {
    defaultSetup();
    (<any>window).drawRect('#333', {x:40,y:40}, {x:40,y:40});
}

main();
```

## Testing

Open terminal and run next commands

```sh
npm i
npm run test
```