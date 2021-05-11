import { IGameObject } from "./models/game-object";
import { Scene } from "./models/scene";

export class SceneInspector {
    private element: HTMLElement;
    
    constructor() {
        this.element = document.querySelector('scene-inspector');
        if (!this.element) return;
    }

    inspect(scene: Scene) {
        const gameObjectElems = scene.gameObjects.map(go => this.createGameObjectElement(go));
        gameObjectElems.forEach(elem => this.element.appendChild(elem)); 
    }

    createGameObjectElement(gameObject: IGameObject) {
        const elem = document.createElement('div');
        this.element.classList.add('game-object');
        elem.innerHTML = `
            <label>Name: <label>
            <input value="${gameObject.name}">
            <label>Tags: <label>
            <input value="${gameObject.tags.join('; ')}">
        `;
        return elem;
    }
}