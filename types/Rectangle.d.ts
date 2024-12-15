import Vector2D from "./Vector2D";
import { HasDimension, HasPoint2D, HasRectangle } from "./types";
declare class Rectangle {
    constructor();
    constructor(width: number, height: number);
    constructor(x: number, y: number, width: number, height: number);
    constructor(dimension: HasDimension);
    constructor(rect: HasRectangle);
    constructor(pos: HasPoint2D, dimension: HasDimension);
}
export default Rectangle;
interface Rectangle {
    x: number;
    y: number;
    width: number;
    height: number;
    opposite(): Vector2D;
    center(): Vector2D;
    area(): number;
}
//# sourceMappingURL=Rectangle.d.ts.map