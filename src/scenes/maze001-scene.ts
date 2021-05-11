import { IGameObject } from "../engine/models/game-object";
import { Scene } from "../engine/models/scene";
import { zero as v3zero } from "../engine/models/vector3";
import { CubeMesh } from "../meshes/cube-mesh";
import { Maze001Mesh } from "../meshes/maze001-mesh";
import { CameraScript } from "../scripts/camera.script";
import { PlayerScript } from "../scripts/player.script";

export const maze001Scene: Scene = {
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
        {
            name: 'maze',
            tags: [],
            transform: {
                position: { x: 0, y: 0, z: 0 },
                rotation: { x: 0, y: 0, z: 0 },
            },
            mesh: new Maze001Mesh(),
            scripts: []
        },
        
    ]
}