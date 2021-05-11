import { CameraScript } from "../scripts/camera.script";
import { Input } from "./input";
import { EngineConfig } from "./models/engine-config";
import { Renderer } from "./models/renderer";
import { Scene } from "./models/scene";
import { CanvasRenderer } from "./rendering/canvas-renderer";

export class Engine {
    constructor(private config: EngineConfig) { }

    startScene(scene: Scene) {
        const canvas = document.querySelector('canvas');
        const renderer: Renderer = new CanvasRenderer(canvas);

        Input.init();
        
        scene.gameObjects.forEach(go =>
            go.scripts.forEach(s => {
                s.gameObject = go;
                s.start();
            })
        );

        const cameraGO = scene.gameObjects.find(go => go.tags.includes(this.config.cameraTag));
        const camera = cameraGO.scripts.find(s => s instanceof CameraScript) as CameraScript;

        setInterval(() => {
            scene.gameObjects.forEach(go =>
                go.scripts.forEach(s =>
                    s.update()
                )
            );
            renderer.render(scene.gameObjects, camera);
        }, (1000 / this.config.fps));
    }
}