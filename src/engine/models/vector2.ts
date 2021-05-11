export interface Vector2 {
    x: number;
    y: number;
}

export function zero(): Vector2 {
    return {
        x: 0,
        y: 0
    }
}