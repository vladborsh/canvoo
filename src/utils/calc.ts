import { Vector } from "../space/vector";

export function calculateCenter(p1: Vector, p2: Vector, p3: Vector): Vector {
    return {
        x: (p1.x + p2.x + p3.x) / 3,
        y: (p1.y + p2.y + p3.y) / 3,
    };
}