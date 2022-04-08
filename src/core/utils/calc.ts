import { Vector } from "../interfaces/vector";

export function calculateCenter(p1: Vector, p2: Vector, p3: Vector): Vector {
    return {
        x: (p1.x + p2.x + p3.x) / 3,
        y: (p1.y + p2.y + p3.y) / 3,
    };
}

export function divide(p: Vector, param: number): Vector {
    return {
        x: p.x / param,
        y: p.y / param,
    };
}

export function multiply(p: Vector, param: number): Vector {
    return {
        x: p.x * param,
        y: p.y * param,
    };
}

export function sum(p1: Vector, p2: Vector): Vector {
    return {
        x: p1.x + p2.x,
        y: p1.y + p2.y,
    };
}

export function isSmall(v: Vector): boolean {
    return Math.abs(v.x) < 0.1 && Math.abs(v.y) < 0.1;
}