import _Matrix from "./Matrix.js";

import _Vector2D from "./Vector2D.js";
import _Vector3D from "./Vector3D.js";
import _Dimension from "./Dimension.js";
import _Rectangle from "./Rectangle.js";
import _Circle from "./Circle.js";



export const lerp = (from: number, to: number, fraq: number) => from * (1 - fraq) + to * fraq;

const highOrderBezier = (points: number[], t: number): number => {
  switch (points.length) {
    case 0: throw Error ('Empty [points].');
    case 1: return points[0];
    case 2: return lerp(points[0], points[1], t);    
    default:
      const newPoints: number[] = [];
      const end = points.length - 1;

      for (let i = 0; i < end; i++) {
        newPoints.push(lerp(points[i], points[i + 1], t));
      }

      return highOrderBezier(newPoints, t);
  }
};



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
export const bezier = (points: number[][], t: number): number[] => points.map(arr => highOrderBezier(arr, t));

/**
 * Clamp value in [min:max].
 * @param {number} value 
 * @param {number} [min] By default is 0. 
 * @param {number} [max] By default is 1.
 * @returns {number}
 */

export const Vector2D = _Vector2D;
export const Vector3D = _Vector3D;
export const Circle = _Circle;
export const Rectangle = _Rectangle;
export const Dimension = _Dimension;

export const Matrix = _Matrix;