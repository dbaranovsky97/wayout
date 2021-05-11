import { IGameObject } from "../engine/models/game-object";
import { Scene } from "../engine/models/scene";
import { zero as v3zero } from "../engine/models/vector3";
import { CubeMesh } from "../meshes/cube-mesh";
import { CameraScript } from "../scripts/camera.script";
import { PlayerScript } from "../scripts/player.script";

function cube(x = 0, y = 0, z = 0): IGameObject {
    return {
        name: 'cube',
        tags: [],
        transform: {
            position: { x, y, z },
            rotation: v3zero()
        },
        mesh: new CubeMesh(),
        scripts: []
    };
}

export const cubeTestScene: Scene = {
    gameObjects: [
        {
            name: 'player',
            tags: ['main-camera'],
            transform: {
                position: { x: 0, y: 1.7, z: -2 },
                rotation: { x: 0, y: 0, z: 0 },
            },
            mesh: null,
            scripts: [
                new PlayerScript(),
                new CameraScript({
                    viewport: {
                        height: 0.9,
                        width: 1.6
                    },
                    perspective: 0.9
                })
            ]
        },
        // {
        //     name: 'floor',
        //     tags: [],
        //     transform: {
        //         position: v3zero(),
        //         rotation: {
        //             x: -90,
        //             y: 0,
        //             z: 0
        //         }
        //     },
        //     mesh: new QuadMesh(),
        //     scripts: []
        // },
        cube(0, 0, 1),
        cube(-5, 0, 0),
        cube(-5, 0, 5),
        cube(0, 0, 5),
        cube(5, 0, 5),
        cube(5, 0, 0),
        cube(5, 0, -5),
        cube(0, 0, -5),
        cube(-5, 0, -5),
    ]
}