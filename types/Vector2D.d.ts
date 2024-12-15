import { HasPoint2D } from "./types";
declare class Vector2D {
    static add: (a: HasPoint2D, b: HasPoint2D) => number;
    static sub: (a: HasPoint2D, b: HasPoint2D) => number;
    static hadamard: (a: HasPoint2D, b: HasPoint2D) => number;
    static mag: (vec: HasPoint2D) => number;
    static yaw: (vec: HasPoint2D) => number;
    static scale: (vec: HasPoint2D, scale?: number) => Vector2D;
    static unit: (vec: HasPoint2D) => Vector2D;
    static dot: (a: HasPoint2D, b: HasPoint2D) => number;
    static cross: (a: HasPoint2D, b: HasPoint2D) => number;
    constructor();
    constructor(x: number, y: number);
    constructor(vec: HasPoint2D);
}
export default Vector2D;
interface Vector2D extends HasPoint2D {
    add(vec: HasPoint2D): Vector2D;
    sub(vec: HasPoint2D): Vector2D;
    hadamard(vec: HasPoint2D): Vector2D;
    scale(scale: number): Vector2D;
    unit(): Vector2D;
    yaw(): number;
    mag(): number;
    dot(vec: HasPoint2D): number;
    cross(vec: HasPoint2D): number;
}
//# sourceMappingURL=Vector2D.d.ts.map