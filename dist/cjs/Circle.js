"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const buffer_js_1 = __importDefault(require("./buffer.js"));
const Point2D_js_1 = __importDefault(require("./Point2D.js"));
const _circle = (...args) => {
    if (!args.length)
        return _circle(0, 0, 0);
    if (typeof args[0] !== 'object') {
        const c = buffer_js_1.default.create('x', 'y', 'radius');
        [c.radius, c.x, c.y] = ((args.length > 2) ? [...args] : [args[0], 0, 0]);
        return c;
    }
    const _args = [];
    if (Reflect.has(args[0], 'radius')) {
        _args.push(args[0].radius);
        if (Reflect.has(args[0], 'x') && 'y' in args[0]) {
            _args.push(args[0].x, args[0].y);
        }
    }
    return _circle(..._args);
};
_circle.diameter = ({ radius }) => radius * 2;
_circle.circumstance = (circle) => _circle.diameter(circle) * Math.PI;
_circle.area = ({ radius }) => Math.PI * Math.pow(radius, 2);
_circle.distance = (a, b) => Point2D_js_1.default.distance(a, b) - (a.radius + b.radius);
exports.default = Object.freeze(_circle);
//# sourceMappingURL=Circle.js.map