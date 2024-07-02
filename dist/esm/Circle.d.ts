import Vector2D from "./Vector2D.js";
type CircleParameters = [hasRadius: HasRadius] | [circle: Circle] | [radius: number] | [position: Vector2D, hasRadius: HasRadius] | [x: number, y: number, radius: number] | [];
export default class Circle {
    x: number;
    y: number;
    radius: number;
    constructor(...args: CircleParameters);
}
export {};
//# sourceMappingURL=Circle.d.ts.map