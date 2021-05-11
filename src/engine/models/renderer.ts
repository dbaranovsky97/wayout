import { CameraScript } from "../../scripts/camera.script";
import { CameraConfig } from "./camera";
import { Mesh } from "./mesh";
import { Renderable } from "./renderable";

export interface Renderer {
    render(renderables: Renderable[], camera: CameraScript): void;
}