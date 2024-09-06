import Dimension from "./Dimension.js";
declare class Rectangle {
    static opposite: Readonly<{
        x: ({ x, width }: Rectangle) => number;
        y: ({ y, height }: Rectangle) => number;
    }>;
    static center: Readonly<{
        x: ({ x, width }: Rectangle) => number;
        y: ({ y, height }: Rectangle) => number;
    }>;
    constructor();
    constructor(width: number, height: number);
    constructor(x: number, y: number, width: number, height: number);
    constructor(dimension: Dimension);
    constructor(rect: Rectangle);
    constructor(pos: Point2D, dimension: Dimension);
}
export default Rectangle;
interface Rectangle extends Shape {
    x: number;
    y: number;
    width: number;
    height: number;
    prototype: Rectangle;
}
