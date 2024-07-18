import { HasX, HasY } from "tmath";
export default class Vector2D implements HasX, HasY {
    static add: (a: Vector2D, b: Vector2D) => Vector2D;
    static sub: (a: Vector2D, b: Vector2D) => Vector2D;
    static hadamard: (a: Vector2D, b: Vector2D) => Vector2D;
    static mag: ({ x, y }: Vector2D) => number;
    static yaw: ({ x, y }: Vector2D) => number;
    static scale: ({ x, y }: Vector2D, scale?: number) => Vector2D;
    static dot: (a: Vector2D, b: Vector2D) => number;
    static cross: (a: Vector2D, b: Vector2D) => number;
    static toArray: ({ x, y }: Vector2D) => number[];
    x: number;
    y: number;
    constructor(...args: Vector2DParameters);
}
type Vector2DParameters = [x: number, y: number] | [vec: Vector2D] | [];
type Vector2DConstructor = {
    new (...args: Vector2DParameters): Vector2D;
    add(a: Vector2D, b: Vector2D): Vector2D;
    sub(a: Vector2D, b: Vector2D): Vector2D;
    hadamard(a: Vector2D, b: Vector2D): Vector2D;
};
declare module 'tmath' {
    const Vector2D: Vector2DConstructor;
}
export {};
