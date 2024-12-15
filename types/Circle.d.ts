import { HasRadius, HasPoint2D } from "./types.js";
declare class Circle {
    constructor();
    constructor(radius: number);
    constructor(x: number, y: number, radius: number);
    constructor(hasRadius: HasRadius);
    constructor(circle: HasPoint2D & HasRadius);
    constructor(pos: HasPoint2D, hasRadius: HasRadius);
}
export default Circle;
interface Circle {
    x: number;
    y: number;
    radius: number;
    diameter(): number;
    circumstance(): number;
    area(): number;
}
//# sourceMappingURL=Circle.d.ts.map