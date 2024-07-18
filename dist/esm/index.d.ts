import _Vector2D from "./Vector2D.js";
import _Vector3D from "./Vector3D.js";
import _Line2D from "./Line2D.js";
import _Circle from "./Circle.js";
import _Rectangle from "./Rectangle.js";
import _Dimension from "./Dimension.js";
import _Matrix from "./Matrix.js";
export declare const Vector2D: typeof _Vector2D;
export declare const Vector3D: typeof _Vector3D;
export declare const Point2D: {
    (...args: ConstructorParameters<typeof _Vector2D>): _Vector2D;
    distance(a: _Vector2D, b: _Vector2D): number;
};
export declare const Line2D: typeof _Line2D;
export declare const Circle: typeof _Circle;
export declare const Rectangle: typeof _Rectangle;
export declare const Dimension: typeof _Dimension;
export declare const Matrix: typeof _Matrix;
