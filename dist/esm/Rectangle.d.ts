import Vector2D from "./Vector2D.js";
import Dimension from "./Dimension.js";
import { HasX } from "tmath";
import { HasWidth, HasY, HasHeight } from "tmath";
type RectangleParameters = [width: number, y: number] | [x: number, y: number, width: number, height: number] | [dimension: Dimension] | [rect: Rectangle] | [vec: Vector2D, dimension: Dimension] | [];
declare class Rectangle {
    static opposite: Readonly<{
        x: ({ x, width }: HasX & HasWidth) => number;
        y: ({ y, height }: HasY & HasHeight) => number;
    }>;
    static center: Readonly<{
        x: ({ x, width }: HasX & HasWidth) => number;
        y: ({ y, height }: HasY & HasHeight) => number;
    }>;
    static area: ({ width, height }: Dimension) => number;
    x: number;
    y: number;
    width: number;
    height: number;
    constructor(...args: RectangleParameters);
}
export default Rectangle;
