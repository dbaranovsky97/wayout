import { Engine } from './engine/engine';
import { SceneInspector } from './engine/scene-inspector';
import { maze001Scene } from './scenes/maze001-scene';

const engine = new Engine({
    fps: 60,
    cameraTag: 'main-camera'
});

engine.startScene(maze001Scene);

const inspector = new SceneInspector();
inspector.inspect(maze001Scene);
