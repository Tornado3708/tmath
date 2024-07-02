"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const buffer_js_1 = __importDefault(require("./buffer.js"));
class Rectangle {
    constructor(...args) {
        buffer_js_1.default.create(this, 'x', 'y', 'width', 'height');
        if (!args.length)
            return this;
        if (args[0] && typeof args === 'object') {
            const index = +(args.length !== 1);
            [this.x, this.y, this.width, this.height] = [+args[0].x || 0, +args[0].y || 0, +args[index].width || 0, +args[index].height || 0];
            return this;
        }
        if (args.length < 2)
            return this;
        [this.x, this.y, this.width, this.height] = args.length < 4 ? [0, 0].concat(args) : args;
    }
}
Rectangle.opposite = Object.freeze({
    x: Object.freeze(({ x, width }) => x + width),
    y: Object.freeze(({ y, height }) => y + height)
});
Rectangle.center = Object.freeze({
    x: Object.freeze(({ x, width }) => x + width),
    y: Object.freeze(({ y, height }) => y + height)
});
Rectangle.area = ({ width, height }) => width * height;
exports.default = Rectangle;
//# sourceMappingURL=Rectangle.js.map