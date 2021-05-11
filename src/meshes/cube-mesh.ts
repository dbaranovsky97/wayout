import { Mesh } from "../engine/models/mesh";
import { Polygon } from "../engine/models/polygon";

export class CubeMesh implements Mesh {
    polygons: Polygon[];

    constructor() {
        this.polygons = [
            {   
                points: [ // передняя грань
                    { x: 0, y: 0, z: 0},
                    { x: 0, y: 1, z: 0},
                    { x: 1, y: 1, z: 0},
                    { x: 1, y: 0, z: 0}
                ]
            },
            {
                points: [   // левая грань
                    { x: 0, y: 0, z: 0},
                    { x: 0, y: 1, z: 0},
                    { x: 0, y: 1, z: 1},
                    { x: 0, y: 0, z: 1},
                ]
            },
            {   
                points: [ // задняя грань
                    { x: 0, y: 0, z: 1},
                    { x: 0, y: 1, z: 1},
                    { x: 1, y: 1, z: 1},
                    { x: 1, y: 0, z: 1}
                ]
            },
            {
                points: [   // левая грань
                    { x: 1, y: 0, z: 0},
                    { x: 1, y: 1, z: 0},
                    { x: 1, y: 1, z: 1},
                    { x: 1, y: 0, z: 1},
                ]
            },
            {
                points: [   // верхняя грань
                    { x: 0, y: 1, z: 0},
                    { x: 0, y: 1, z: 1},
                    { x: 1, y: 1, z: 1},
                    { x: 1, y: 1, z: 0},
                ]
            },
            {
                points: [   // нижняя грань
                    { x: 0, y: 0, z: 0},
                    { x: 0, y: 0, z: 1},
                    { x: 1, y: 0, z: 1},
                    { x: 1, y: 0, z: 0},
                ]
            }
        ]
    }
}