import { HasZ } from "tmath";
import Vector2D from "./Vector2D.js";
export default class Vector3D implements Vector2D, HasZ {
    static mag: ({ x, y, z }: Vector3D) => number;
    static pitch: ({ x, z }: Vector3D) => number;
    static roll: ({ y, z }: Vector3D) => number;
    static yaw: (vec: Vector3D) => number;
    static add: (a: Vector3D, b: Vector3D) => Vector3D;
    static sub: (a: Vector3D, b: Vector3D) => Vector3D;
    static hadamard: (a: Vector3D, b: Vector3D) => Vector3D;
    static scale: ({ x, y, z }: Vector3D, scale?: number) => void;
    static unit: (vec: Vector3D) => void;
    static dot: (a: Vector3D, b: Vector3D) => number;
    static cross: (a: Vector3D, b: Vector3D) => Vector3D;
    static toArray: ({ x, y, z }: Vector3D) => number[];
    x: number;
    y: number;
    z: number;
    constructor(...args: Vector3DParameters);
}
type Vector3DParameters = [x: number, y: number, z: number] | [vec: Vector3D] | [];
declare module 'tmath' {
    const Vector3D: Vector3D;
}
export {};
