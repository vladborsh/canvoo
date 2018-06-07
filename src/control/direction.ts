export enum Direction {
    LEFT,
    RIGHT,
    UP,
    DOWN,
};

export interface Directions {
    [key: number]: Direction;
}

export const DIRECTIONS: Directions = {
    37 : Direction.LEFT,
    39 : Direction.RIGHT,
    38 : Direction.UP,
    40 : Direction.DOWN,
    65 : Direction.LEFT,
    68 : Direction.RIGHT,
    87 : Direction.UP,
    83 : Direction.DOWN,
}