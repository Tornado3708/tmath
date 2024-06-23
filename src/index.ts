import { CircleConstructor, DimensionConstructor, Line2DConstructor, MatrixConstructor, RectangleConstructor, Vector2DConstructor, Vector3DConstructor } from "tmath";

import _Vector2D  from "./Vector2D.js";
import _Vector3D  from "./Vector3D.js";
import _Line2D    from "./Line2D.js";

import _Circle    from "./Circle.js";
import _Rectangle from "./Rectangle.js";
import _Dimension from "./Dimension.js";

import _Matrix    from "./Matrix.js";





export const Vector2D  = _Vector2D  as Vector2DConstructor;
export const Vector3D  = _Vector3D  as Vector3DConstructor;
export const Line2D    = _Line2D    as Line2DConstructor;
export const Circle    = _Circle    as CircleConstructor;
export const Rectangle = _Rectangle as RectangleConstructor;
export const Dimension = _Dimension as DimensionConstructor;

export const Matrix    = _Matrix as MatrixConstructor;


export declare type Vector2D  = ReturnType<typeof _Vector2D>;
export declare type Vector3D  = ReturnType<typeof _Vector3D>;
export declare type Line2D    = ReturnType<typeof _Line2D>;
export declare type Circle    = ReturnType<typeof _Circle>;
export declare type Rectangle = ReturnType<typeof _Rectangle>;
export declare type Dimension = ReturnType<typeof _Dimension>;

export declare type Matrix    = ReturnType<typeof _Matrix>;


export default {
  Vector2D,
  Vector3D,
  Circle,
  Rectangle,
  Dimension,

  Matrix,
};