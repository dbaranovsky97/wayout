import { Vector2 } from "./vector2";

export interface Vector3 extends Vector2 {
    x: number;
    y: number;
    z: number;
}

export function zero(): Vector3 {
    return {
        x: 0,
        y: 0,
        z: 0
    }
}

export function length(p: Vector3): number {
    return distance(zero(), p);
}

export function distance(p1: Vector3, p2: Vector3): number {
    const sqrt = Math.sqrt;
    const pow2 = (n: number) => Math.pow(n, 2);
    return sqrt(pow2(p1.x - p2.x) + pow2(p1.y - p2.y) + pow2(p1.z - p2.z));
}