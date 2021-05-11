import { IGameObject } from "../engine/models/game-object";
import { IScript } from "../engine/models/script";

export class Script implements IScript {
    gameObject: IGameObject;

    constructor() {
    }

    start(): void {
    }

    update(): void {
    }
}