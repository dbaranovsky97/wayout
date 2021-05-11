export class Input {
    private static pressedKeys: string[] = [];

    static init() {
        document.addEventListener('keydown', e => {
            this.pressedKeys.push(e.key);
        });
        document.addEventListener('keyup', e => {
            this.pressedKeys = this.pressedKeys.filter(key => key != e.key);
        });
    }

    static isKeyPressed(keyCode: string) {
        return this.pressedKeys.includes(keyCode);
    }
}

