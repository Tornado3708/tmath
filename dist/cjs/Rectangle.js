"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const buffer_js_1 = __importDefault(require("./buffer.js"));
const Vector2D_js_1 = __importDefault(require("./Vector2D.js"));
const rectangle = (...args) => {
    if (!args.length)
        return rectangle(0, 0, 0, 0);
    if (typeof args[0] !== 'object') {
        const rect = buffer_js_1.default.create('x', 'y', 'width', 'height');
        [rect.x, rect.y, rect.width, rect.height] = ((args.length > 3) ? args : [0, 0, ...args]);
        return rect;
    }
    const _args = [];
    if ('x' in args[0] && 'y' in args[0]) {
        _args.push(args[0].x, args[0].y);
    }
    if ('width' in args[0] && 'height' in args[0]) {
        _args.push(args[0].width, args[0].height);
    }
    else if ('width' in args[1] && 'height' in args[1]) {
        _args.push(args[1].width, args[1].height);
    }
    return rectangle(..._args);
};
{
    const compose = (...funcs) => (arg) => funcs.reduceRight((a, f) => f(a), arg);
    const centerX = ({ x, width }) => x + width * .5;
    const centerY = ({ y, height }) => y + height * .5;
    const oppositeX = ({ x, width }) => x + width;
    const oppositeY = ({ y, height }) => y + height;
    const centerModifier = { x: { value: centerX }, y: { value: centerY } };
    const oppositeModifier = { x: { value: oppositeX }, y: { value: oppositeY } };
    rectangle.center = compose(Object.freeze, (arg) => Object.defineProperties(arg, centerModifier))((rect) => (0, Vector2D_js_1.default)(centerX(rect), centerY(rect)));
    rectangle.opposite = compose(Object.freeze, (arg) => Object.defineProperties(arg, oppositeModifier))((rect) => (0, Vector2D_js_1.default)(oppositeX(rect), oppositeY(rect)));
}
rectangle.area = ({ width, height }) => width * height;
rectangle.diagonal = ({ width, height }) => Math.hypot(width, height);
rectangle.perimeter = ({ width, height }) => (width + height) * 2;
exports.default = Object.freeze(rectangle);
//# sourceMappingURL=Rectangle.js.map