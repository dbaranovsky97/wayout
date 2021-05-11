import { Mesh } from "../engine/models/mesh";
import { Polygon } from "../engine/models/polygon";
import { Vector2 } from "../engine/models/vector2";
import { Vector3 } from "../engine/models/vector3";

export class Maze001Mesh implements Mesh {
    private scheme = [
        'xxxxxxxxoxxxxxxxxxxxxxx',
        'xxxx      x         xxx',
        'x     xxxxxxxxxxx     x',
        'x xxxxx     x   xxxxx x',
        'x       xxx x x x     x',
        'xxxxxxxxxxx x x xxxxx x',
        'x             x     x x',
        'xx xxxxxxxx x xxxxx x x',
        'x  x     x  x     x x x',
        'x xx xxx xxxx xxx x x x',
        'x    x          x     x',
        'xxxxxxxxxxxixxxxxxxxxxx'
    ]

    polygons: Polygon[];

    constructor() {
        const height = this.scheme.length;
        const width = this.scheme[0].length;

        const polygons: Polygon[] = [];

        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {

                if (this.scheme[i][j] == 'x') {
                    const p1 = {
                        x: j * 2,
                        y: 0,
                        z: i * -2
                    };

                    if (this.scheme[i + 1] && this.scheme[i + 1][j] == 'x') {
                        const p2 = {
                            x: j * 2,
                            y: 0,
                            z: (i + 1) * -2
                        };

                        polygons.push(this.createWallPolygon(p1, p2, 2));
                    }
    
                    if (this.scheme[i][j + 1] == 'x') {
                        const p2 = {
                            x: (j + 1) * 2,
                            y: 0,
                            z: i * -2
                        };

                        polygons.push(this.createWallPolygon(p1, p2, 2));
                    }
                }
            }
        }

        this.polygons = polygons;
    }

    createWallPolygon(p1: Vector3, p2: Vector3, height: number): Polygon {
        return {
            points: [
                { ...p1 },
                
                { ...p2 },
                {
                    ...p2,
                    y: p2.y + height
                },
                {
                    ...p1,
                    y: p1.y + height
                }
            ]
        };
    }
}