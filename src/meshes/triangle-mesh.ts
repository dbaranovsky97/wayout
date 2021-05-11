import { Mesh } from "../engine/models/mesh";
import { Polygon } from "../engine/models/polygon";

export class Triangle implements Mesh {
    polygons: Polygon[];

    constructor() {
        this.polygons = [
            {   
                points: [
                    { x: -1, y: 0, z: 0},
                    { x: 0, y: 1, z: 0},
                    { x: 1, y: 0, z: 0}
                ]
            }
        ]
    }
}