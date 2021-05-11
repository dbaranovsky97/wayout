import { CameraScript } from "../../scripts/camera.script";
import { CameraConfig } from "../models/camera";
import { Mesh } from "../models/mesh";
import { Polygon } from "../models/polygon";
import { Renderable } from "../models/renderable";
import { Renderer } from "../models/renderer";
import { Transform, zero } from "../models/transform";
import { Vector2 } from "../models/vector2";
import { Vector3, zero as v3Zero, length } from "../models/vector3";
import { multiplyMatrixAndPoint, getRotationMatrix, rad } from "./matrix-helper";

export class CanvasRenderer implements Renderer {

    private ctx: CanvasRenderingContext2D;
    private width: number;
    private height: number;
    private screenCenter: Vector2;

    constructor(canvas: HTMLCanvasElement) {
        this.ctx = canvas.getContext('2d');
        this.width = canvas.width;
        this.height = canvas.height;
        this.screenCenter = {
            x: this.width / 2,
            y: this.height / 2
        }

        this.ctx.fillStyle = 'white';
    }

    render(renderables: Renderable[], camera: CameraScript): void {
        this.ctx.clearRect(0, 0, this.width, this.height);

        let mergedRenderable = this.merge(renderables);

        const mergedMesh = this.applyTransform(mergedRenderable.mesh, this.invert(camera.gameObject.transform), 'global');

        const polygons = mergedMesh.polygons
            .filter((pol) => !!pol.points.find(p => p.z > 0))
            .sort((p1, p2) => length(this.getPolygonCenter(p2)) - length(this.getPolygonCenter(p1)));

        polygons.forEach(pol => {
            const screenPoints = pol.points.map(p => this.worldPointToScreenPoint(p, camera.config));
            this.render2dPolygon(screenPoints);
        });
    }

    render2dPolygon(points: Vector2[]) {
        const pointOnScreen = points.find(p =>
            (p.x >= 0 && p.x <= this.width)
            && (p.y >= 0 && p.y <= this.height)
        );

        if (!pointOnScreen) return;

        this.ctx.beginPath();
        this.ctx.moveTo(points[0].x, points[0].y);

        for (let i = 1; i < points.length; i++) {
            const p = points[i];
            this.ctx.lineTo(p.x, p.y);
        }

        this.ctx.closePath();
        
        this.ctx.fill();
        this.ctx.stroke();
    }

    private invert(transform: Transform): Transform {
        const pos = transform.position;
        const rot = transform.rotation;
        return {
            position: {
                x: -pos.x,
                y: -pos.y,
                z: -pos.z,
            },
            rotation: {
                x: -rot.x,
                y: -rot.y,
                z: -rot.z,
            }
        }
    }

    private merge(renderables: Renderable[]): Renderable {
        let polygons: Polygon[] = [];
        renderables.forEach((r) => {
            if (r.mesh && r.mesh.polygons && r.mesh.polygons.length > 0) {
                const mesh = this.applyTransform(r.mesh, r.transform, 'local');
                polygons.push(...mesh.polygons);
            }
        });
        return {
            transform: zero(),
            mesh: { polygons }
        };
    }

    private applyTransform(mesh: Mesh, transform: Transform, pivot: 'local' | 'global'): Mesh {
        if (pivot == 'local' && transform.rotation) {
            mesh = this.rotateMesh(mesh, transform.rotation)
        }

        if (transform.position) {
            mesh = this.moveMesh(mesh, transform.position);
        }

        if (pivot == 'global' && transform.rotation) {
            mesh = this.rotateMesh(mesh, transform.rotation);
        }

        return mesh;
    }

    private moveMesh(mesh: Mesh, position: Vector3): Mesh {
        const polygons: Polygon[] = mesh.polygons.map(pol => ({
            points: pol.points.map(p => ({
                x: p.x + position.x,
                y: p.y + position.y,
                z: p.z + position.z
            }))
        }));
        return { polygons };
    }

    private rotateMesh(mesh: Mesh, rotation: Vector3): Mesh {
        const polygons: Polygon[] = mesh.polygons.map(pol => ({
            points: pol.points.map(point => {
                let p = [point.x, point.y, point.z, 0];
                p = multiplyMatrixAndPoint(getRotationMatrix('x', rad(rotation.x)), p)
                p = multiplyMatrixAndPoint(getRotationMatrix('y', rad(rotation.y)), p);
                p = multiplyMatrixAndPoint(getRotationMatrix('z', rad(rotation.z)), p);
                return {
                    x: p[0],
                    y: p[1],
                    z: p[2]
                }
            })
        }));
        return { polygons };
    }

    private worldPointToScreenPoint(p: Vector3, camera: CameraConfig): Vector2 {
        const kX = this.width / camera.viewport.width;    // коэффициент перевода метров в пиксели на расстоянии 1 метр
        const kY = this.height / camera.viewport.height;  // коэффициент перевода метров в пиксели на расстоянии 1 метр
        const minZ = (camera.perspective - 0.99) / camera.perspective;
        const z = p.z < minZ ? minZ : p.z;
        const kZ = 1 / ( 1 + ((z - 1) * camera.perspective));    

        let result = {
            x: this.screenCenter.x + ((p.x * kX) * kZ),
            y: this.height - (this.screenCenter.y + ((p.y * kY) * kZ))
        }

        return result;
    }

    private getPolygonCenter(polygon: Polygon): Vector3 {
        const sum = polygon.points.reduce((prev, current) => ({
            x: prev.x + current.x,
            y: prev.y + current.y,
            z: prev.z + current.z
        }), v3Zero());

        const count = polygon.points.length
        return {
            x: sum.x / count,
            y: sum.y / count,
            z: sum.z / count,
        };
    }
}