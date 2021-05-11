import { Vector3, zero as v3zero } from "./vector3";

export interface Transform {
    position: Vector3;
    rotation: Vector3;
}

export function zero(): Transform {
    return {
        position: v3zero(),
        rotation: v3zero()
    }
}