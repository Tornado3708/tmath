import buffer from "./buffer.js";
const _vector2d = (...args) => {
    if (!args.length)
        return _vector2d(0, 0);
    if (typeof args[0] !== 'object') {
        const vec = buffer.create('x', 'y');
        [vec.x, vec.y] = [...args];
        return vec;
    }
    else
        return _vector2d(args[0].x, args[0].y);
};
/**
 * Magnitude, length.
 * @param {Vector2D} vec
 * @returns {number} Magnitude.
 */
_vector2d.mag = ({ x, y }) => Math.hypot(x, y);
/**
 * Azymuth, yaw.
 * @param {Vector2D} vec Vector.
 * @returns {number} Yaw.
 */
_vector2d.yaw = ({ x, y }) => Math.atan2(y, x);
/**
 *
 * @param {Vector2D} a
 * @param {Vector2D} b
 * @returns {Vector2D}
 */
_vector2d.add = (a, b) => _vector2d(a.x + b.x, a.y + b.y);
_vector2d.sub = (a, b) => _vector2d(a.x - b.x, a.y - b.y);
_vector2d.hadamard = (a, b) => _vector2d(a.x * b.x, a.y * b.y);
_vector2d.unit = ({ x, y }) => {
    const inverse = 1 / Math.hypot(x, y);
    return _vector2d(x * inverse, y * inverse);
};
_vector2d.dot = (a, b) => a.x * b.x + a.y * b.y;
_vector2d.cross = (a, b) => a.x * b.y - a.y * b.x;
export default Object.freeze(_vector2d);
