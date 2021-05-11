import { IGameObject } from "./game-object";

export interface IScript {
    gameObject: IGameObject;
    start(): void;
    update(): void;
}