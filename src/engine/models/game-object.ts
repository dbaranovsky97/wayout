import { Mesh } from "./mesh";
import { Renderable } from "./renderable";
import { IScript } from "./script";
import { Transform } from "./transform";

export interface IGameObject extends Renderable {
    name: string;
    tags: string[];
    transform: Transform;
    mesh: Mesh;
    scripts: IScript[];
}