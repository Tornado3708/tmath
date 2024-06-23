/// <reference path="../../types/tmath.d.ts" />
import { CircleConstructor, DimensionConstructor, Line2DConstructor, MatrixConstructor, RectangleConstructor, Vector2DConstructor, Vector3DConstructor } from "tmath";
import _Vector2D from "./Vector2D.js";
import _Vector3D from "./Vector3D.js";
import _Line2D from "./Line2D.js";
import _Circle from "./Circle.js";
import _Rectangle from "./Rectangle.js";
import _Dimension from "./Dimension.js";
import _Matrix from "./Matrix.js";
export declare const Vector2D: Vector2DConstructor;
export declare const Vector3D: Vector3DConstructor;
export declare const Line2D: Line2DConstructor;
export declare const Circle: CircleConstructor;
export declare const Rectangle: RectangleConstructor;
export declare const Dimension: DimensionConstructor;
export declare const Matrix: MatrixConstructor;
export declare type Vector2D = ReturnType<typeof _Vector2D>;
export declare type Vector3D = ReturnType<typeof _Vector3D>;
export declare type Line2D = ReturnType<typeof _Line2D>;
export declare type Circle = ReturnType<typeof _Circle>;
export declare type Rectangle = ReturnType<typeof _Rectangle>;
export declare type Dimension = ReturnType<typeof _Dimension>;
export declare type Matrix = ReturnType<typeof _Matrix>;
declare const _default: {
    Vector2D: Vector2DConstructor;
    Vector3D: Vector3DConstructor;
    Circle: CircleConstructor;
    Rectangle: RectangleConstructor;
    Dimension: DimensionConstructor;
    Matrix: MatrixConstructor;
};
export default _default;
//# sourceMappingURL=index.d.ts.map