/// <reference path="../../types/tmath.d.ts" />
export declare const lerp: (from: number, to: number, fraq: number) => number;
/**
 * Polydimensional bezier.
 * [[x1, x2, x3, ...],
 *  [y1, y2, y3, ...],
 *  [z1, z2, z3, ...],
 * ...]
 * @param {number[][]} points
 * @param {number} t
 * @returns {number[]}
 */
export declare const bezier: (points: number[][], t: number) => number[];
/**
 * Clamp value in [min:max].
 * @param {number} value
 * @param {number} [min] By default is 0.
 * @param {number} [max] By default is 1.
 * @returns {number}
 */
export declare const Vector2D: import("tmath").Vector2DConstructor;
export declare const Vector3D: import("tmath").Vector3DConstructor;
export declare const Circle: import("tmath").CircleConstructor;
export declare const Rectangle: import("tmath").RectangleConstructor;
export declare const Dimension: import("tmath").DimensionConstructor;
export declare const Matrix: import("tmath").MatrixConstructor;
