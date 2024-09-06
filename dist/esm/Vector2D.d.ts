declare class Vector2D {
    static add: (a: Point2D, b: Point2D) => Vector2D;
    static sub: (a: Point2D, b: Point2D) => Vector2D;
    static hadamard: (a: Point2D, b: Point2D) => Vector2D;
    static mag: ({ x, y }: Point2D) => number;
    static yaw: ({ x, y }: Point2D) => number;
    static scale: ({ x, y }: Point2D, scale?: number) => Vector2D;
    static unit: (vec: Point2D) => Vector2D;
    static dot: (a: Point2D, b: Point2D) => number;
    static cross: (a: Point2D, b: Point2D) => number;
    static toArray: ({ x, y }: Point2D) => [number, number];
    constructor();
    constructor(x: number, y: number);
    constructor(vec: Point2D);
}
export default Vector2D;
interface Vector2D extends Point2D {
    add(vec: Point2D): Vector2D;
    sub(vec: Point2D): Vector2D;
    hadamard(vec: Point2D): Vector2D;
    yaw(): number;
    mag(): number;
    scale(scale: number): Vector2D;
    unit(): Vector2D;
    dot(vec: Point2D): number;
    cross(vec: Point2D): number;
    toArray(): [number, number];
    prototype: Vector2D;
}
type Point2D = {
    x: number;
    y: number;
};
declare module 'tmath' {
    const Vector2D: Vector2D;
}
