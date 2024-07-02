import Vector2D from "./Vector2D.js";
import Dimension from "./Dimension.js";
type RectangleParameters = [width: number, y: number] | [x: number, y: number, width: number, height: number] | [dimension: Dimension] | [rect: Rectangle] | [vec: Vector2D, dimension: Dimension] | [];
declare class Rectangle {
    static opposite: Readonly<{
        x: ({ x, width }: HasX & HasWidth) => any;
        y: ({ y, height }: HasY & HasHeight) => any;
    }>;
    static center: Readonly<{
        x: ({ x, width }: HasX & HasWidth) => any;
        y: ({ y, height }: HasY & HasHeight) => any;
    }>;
    static area: ({ width, height }: Dimension) => number;
    x: number;
    y: number;
    width: number;
    height: number;
    constructor(...args: RectangleParameters);
}
export default Rectangle;
//# sourceMappingURL=Rectangle.d.ts.map