import Vector2D from "./Vector2D";
type Line2DParameters = [line: Line2D] | [a: Vector2D, b: Vector2D] | [x1: number, y1: number, x2: number, y2: number] | [];
export default class Line2D {
    x1: number;
    x2: number;
    y1: number;
    y2: number;
    constructor(...args: Line2DParameters);
}
export {};
//# sourceMappingURL=Line2D.d.ts.map