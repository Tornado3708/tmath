import { HasPoint3D } from "./types.js";
declare class Vector3D {
    static mag: (vec: HasPoint3D) => number;
    static pitch: (vec: HasPoint3D) => number;
    static roll: (vec: HasPoint3D) => number;
    static yaw: (vec: HasPoint3D) => number;
    static add: (a: HasPoint3D, b: HasPoint3D) => Vector3D;
    static sub: (a: HasPoint3D, b: HasPoint3D) => Vector3D;
    static hadamard: (a: HasPoint3D, b: HasPoint3D) => Vector3D;
    static scale: (vec: HasPoint3D, scale?: number) => Vector3D;
    static unit: (vec: HasPoint3D) => Vector3D;
    static dot: (a: HasPoint3D, b: HasPoint3D) => number;
    static cross: (a: HasPoint3D, b: HasPoint3D) => Vector3D;
    constructor();
    constructor(x: number, y: number, z: number);
    constructor(vec: HasPoint3D);
}
interface Vector3D extends HasPoint3D {
    add(vec: HasPoint3D): Vector3D;
    sub(vec: HasPoint3D): Vector3D;
    hadamard(vec: HasPoint3D): Vector3D;
    scale(scale?: number): Vector3D;
    unit(): Vector3D;
    mag(): number;
    roll(): number;
    pitch(): number;
    yaw(): number;
    dot(vec: HasPoint3D): number;
    cross(vec: HasPoint3D): Vector3D;
}
export default Vector3D;
//# sourceMappingURL=Vector3D.d.ts.map