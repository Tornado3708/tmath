"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Matrix = exports.Dimension = exports.Rectangle = exports.Circle = exports.Vector3D = exports.Vector2D = exports.bezier = exports.lerp = void 0;
const Matrix_js_1 = __importDefault(require("./Matrix.js"));
const Vector2D_js_1 = __importDefault(require("./Vector2D.js"));
const Vector3D_js_1 = __importDefault(require("./Vector3D.js"));
const Dimension_js_1 = __importDefault(require("./Dimension.js"));
const Rectangle_js_1 = __importDefault(require("./Rectangle.js"));
const Circle_js_1 = __importDefault(require("./Circle.js"));
const lerp = (from, to, fraq) => from * (1 - fraq) + to * fraq;
exports.lerp = lerp;
const highOrderBezier = (points, t) => {
    switch (points.length) {
        case 0: throw Error('Empty [points].');
        case 1: return points[0];
        case 2: return (0, exports.lerp)(points[0], points[1], t);
        default:
            const newPoints = [];
            const end = points.length - 1;
            for (let i = 0; i < end; i++) {
                newPoints.push((0, exports.lerp)(points[i], points[i + 1], t));
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
const bezier = (points, t) => points.map(arr => highOrderBezier(arr, t));
exports.bezier = bezier;
/**
 * Clamp value in [min:max].
 * @param {number} value
 * @param {number} [min] By default is 0.
 * @param {number} [max] By default is 1.
 * @returns {number}
 */
exports.Vector2D = Vector2D_js_1.default;
exports.Vector3D = Vector3D_js_1.default;
exports.Circle = Circle_js_1.default;
exports.Rectangle = Rectangle_js_1.default;
exports.Dimension = Dimension_js_1.default;
exports.Matrix = Matrix_js_1.default;
