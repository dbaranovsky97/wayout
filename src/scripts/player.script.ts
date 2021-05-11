import { Input } from "../engine/input";
import { rad } from "../engine/rendering/matrix-helper";
import { Script } from "../engine/script";

export class PlayerScript extends Script {
    moveSpeed = 0.1;
    rotationSpeed = 1;

    constructor() {
        super();   
    }
    
    start(): void {

    }

    update(): void {
        if (Input.isKeyPressed('ArrowUp')) {
            this.move(this.moveSpeed);
        }

        if (Input.isKeyPressed('ArrowDown')) {
            this.move(-this.moveSpeed);
        }

        if (Input.isKeyPressed('ArrowLeft')) {
            this.rotateAroundY(this.rotationSpeed);
        }

        if (Input.isKeyPressed('ArrowRight')) {
            this.rotateAroundY(-this.rotationSpeed);
        }
    }

    move(speed: number): void {
        const rot = this.gameObject.transform.rotation;
        const x = Math.cos(rad(rot.y + 90)) * speed;
        const z = Math.sin(rad(rot.y + 90)) * speed;
        
        this.gameObject.transform.position.x += x;
        this.gameObject.transform.position.z += z;
    }

    rotateAroundY(angle: number): void {
        this.gameObject.transform.rotation.y += angle;
        // this.gameObject.transform.rotation.x = ((-axis.y)/10) % 360;
    }

}