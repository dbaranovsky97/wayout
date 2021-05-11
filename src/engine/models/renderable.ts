import { Mesh } from "./mesh";
import { Transform } from "./transform";

export interface Renderable {
    transform: Transform;
    mesh: Mesh;
}