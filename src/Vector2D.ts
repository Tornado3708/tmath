import { HasX, HasY, Vector2D, Vector2DConstructor } from "tmath";
import buffer from "./buffer.js";



const _vector2d: Vector2DConstructor = (...args) => {
  if (!args.length) return _vector2d(0, 0);

  if (typeof args[0] !== 'object') {
      const vec = buffer.create('x', 'y') as Vector2D;
      [vec.x, vec.y] = [...args] as [number, number];
      return vec;
  } else return _vector2d(..._vector2d.toArray(args[0]));
};

/**
 * Magnitude, length.
 * @param {Vector2D} vec 
 * @returns {number} Magnitude.
 */
_vector2d.mag = ({x, y}: Vector2D): number => Math.hypot(x, y);
/**
 * Azymuth, yaw.
 * @param {Vector2D} vec Vector. 
 * @returns {number} Yaw.
 */
_vector2d.yaw = ({x, y}: Vector2D): number => Math.atan2(y, x);


/**
 * 
 * @param {Vector2D} a 
 * @param {Vector2D} b 
 * @returns {Vector2D}
 */
_vector2d.add = (a: Vector2D, b: Vector2D): Vector2D => _vector2d(a.x + b.x, a.y + b.y);
_vector2d.sub = (a: Vector2D, b: Vector2D): Vector2D => _vector2d(a.x - b.x, a.y - b.y);
_vector2d.hadamard = (a: Vector2D, b: Vector2D): Vector2D => _vector2d(a.x * b.x, a.y * b.y);

_vector2d.unit = ({x, y}: Vector2D) => {
  const inverse = 1 / Math.hypot(x, y);
  return _vector2d(x * inverse, y * inverse);
};

_vector2d.dot = (a: Vector2D, b: Vector2D): number => a.x * b.x + a.y * b.y;
_vector2d.cross = (a: Vector2D, b: Vector2D): number => a.x * b.y - a.y * b.x;
_vector2d.toArray = ({x, y}: Vector2D): [number, number] => [x, y]; 

export default Object.freeze(_vector2d) as Vector2DConstructor;



