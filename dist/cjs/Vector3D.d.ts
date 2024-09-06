declare class Vector3D {
    static mag: ({ x, y, z }: Point3D) => number;
    static pitch: ({ x, z }: Point3D) => number;
    static roll: ({ y, z }: Point3D) => number;
    static yaw: (vec: Point3D) => number;
    static add: (a: Point3D, b: Point3D) => Vector3D;
    static sub: (a: Point3D, b: Point3D) => Vector3D;
    static hadamard: (a: Point3D, b: Point3D) => Vector3D;
    static scale: ({ x, y, z }: Point3D, scale?: number) => Vector3D;
    static unit: (vec: Point3D) => Vector3D;
    static dot: (a: Point3D, b: Point3D) => number;
    static cross: (a: Point3D, b: Point3D) => Vector3D;
    static toArray: ({ x, y, z }: Point3D) => number[];
    constructor();
    constructor(x: number, y: number, z: number);
    constructor(vec: Point3D);
}
interface Vector3D extends Point3D {
    add(vec: Point3D): Vector3D;
    sub(vec: Point3D): Vector3D;
    hadamard(vec: Point3D): Vector3D;
    scale(): Vector3D;
    scale(scale: number): Vector3D;
    unit(): Vector3D;
    dot(vec: Point3D): number;
    cross(vec: Point3D): Vector3D;
    toArray(vec: Point3D): [number, number, number];
    prototype: Vector3D;
}
export default Vector3D;
declare module 'tmath' {
    const Vector3D: Vector3D;
}
