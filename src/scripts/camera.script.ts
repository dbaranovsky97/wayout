import { defaultCameraConfig } from "../engine/defaults/default-camera-config";
import { CameraConfig } from "../engine/models/camera";
import { Script } from "../engine/script";

export class CameraScript extends Script {
    constructor(private config?: CameraConfig) {
        super();

        if (!this.config) {
            this.config = defaultCameraConfig;
        }
    }

    start(): void {
        
    }

    update(): void {

    }

}