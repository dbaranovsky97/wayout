import { IGameObject } from "../engine/models/game-object";
import { IScript } from "../engine/models/script";

export class RotationScript implements IScript {
    gameObject: IGameObject;
    
    start(): void {
    }

    update(): void {
        this.gameObject.transform.rotation.x += 2;

        if (this.gameObject.transform.rotation.x >= 360) {
            this.gameObject.transform.rotation.x = 0;
        }
    }

}