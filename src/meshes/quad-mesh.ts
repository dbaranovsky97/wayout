import { Mesh } from "../engine/models/mesh";
import { Polygon } from "../engine/models/polygon";

export class QuadMesh implements Mesh {
    polygons: Polygon[];

    constructor() {
        this.polygons = [
            {   
                points: [
                    { x: -7, y: -7, z: 0},
                    { x: -7, y: 7, z: 0},
                    { x: 7, y: 7, z: 0},
                    { x: 7, y: -7, z: 0}
                ]
            }
        ]
    }
}