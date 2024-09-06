(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./Vector2D.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Vector2D_js_1 = require("./Vector2D.js");
    const __x__ = new WeakMap(), __y__ = new WeakMap(), __width__ = new WeakMap(), __height__ = new WeakMap();
    class Rectangle {
        constructor(...args) {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            switch (args.length) {
                case 0: break;
                case 1:
                    if (typeof args[0] === 'object') {
                        this.x = (_a = args[0]) === null || _a === void 0 ? void 0 : _a.x;
                        this.y = (_b = args[0]) === null || _b === void 0 ? void 0 : _b.y;
                        this.width = (_c = args[0]) === null || _c === void 0 ? void 0 : _c.width;
                        this.height = (_d = args[0]) === null || _d === void 0 ? void 0 : _d.height;
                    }
                    ;
                    break;
                case 2:
                    if (typeof args[0] === 'object' && typeof args[1] === 'object') {
                        this.x = (_e = args[0]) === null || _e === void 0 ? void 0 : _e.x;
                        this.y = (_f = args[0]) === null || _f === void 0 ? void 0 : _f.y;
                        this.width = (_g = args[1]) === null || _g === void 0 ? void 0 : _g.width;
                        this.height = (_h = args[1]) === null || _h === void 0 ? void 0 : _h.height;
                    }
                    else {
                        [this.width, this.height] = args;
                    }
                    break;
                default: [this.x, this.y, this.width, this.height] = args;
            }
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
    {
        const descriptor = (buffer) => ({
            set(value) { buffer.set(this, +value || 0); },
            get() { return buffer.get(this) || 0; },
            enumerable: true
        });
        Object.defineProperties(Rectangle.prototype, {
            x: descriptor(__x__),
            y: descriptor(__y__),
            width: descriptor(__width__),
            height: descriptor(__height__)
        });
    }
    Rectangle.prototype.contains = function contains(...args) {
        if (!args.length)
            return false;
        switch (args.length) {
            case 1: return 'width' in args[0] && 'height' in args[0]
                ? rectContains(this, args[0].x, args[0].y, args[0].width, args[0].height)
                : pointContains(this, args[0].x, args[0].y);
            case 2: return pointContains(this, ...args);
            default: return rectContains(this, ...args);
        }
    };
    Rectangle.prototype.intersects = function intersects(...args) {
        switch (args.length) {
            case 1:
                if ('x' in args[0] && 'y' in args[0] && 'width' in args[0] && 'height' in args[0])
                    return __intersects__(this, +args[0].x, +args[0].y, +args[0].width, +args[0].height);
                throw Error('Parameter is not rectangle.');
            case 4:
                return __intersects__(this, ...args);
            default: throw Error('Parameter(s) are not matching.');
        }
    };
    Rectangle.prototype.getBounds = function getBounds() { return new Rectangle(this); };
    Rectangle.prototype.transform = function* transform(affineTransform) {
        for (let i = 0; i < 4; i++) {
            switch (i) {
                case 0:
                    yield new Vector2D_js_1.default(...affine(this.x + this.width, this.y, affineTransform));
                    break;
                case 1:
                    yield new Vector2D_js_1.default(...affine(this.x, this.y, affineTransform));
                    break;
                case 2:
                    yield new Vector2D_js_1.default(...affine(this.x, this.y + this.height, affineTransform));
                    break;
                case 3:
                    yield new Vector2D_js_1.default(...affine(this.x + this.width, this.y + this.height, affineTransform));
                    break;
                // }
            }
        }
    };
    function affine(x, y, m) {
        return [
            x * m[0] + x * m[2] + m[4],
            y * m[1] + y * m[3] + m[5]
        ];
    }
    function __intersects__(rect, x, y, width, height) {
        return (rect.x < x + width || rect.x + rect.width > x) && (rect.y < y + height || rect.y + rect.width > y);
    }
    function pointContains(rect, x, y) {
        return (x >= rect.x && x <= Rectangle.opposite.x(rect) &&
            y >= rect.y && y <= Rectangle.opposite.y(rect));
    }
    function rectContains(box, x, y, width, height) {
        return (x >= box.x && x + width <= Rectangle.opposite.x(box) &&
            y >= box.y && y + height <= Rectangle.opposite.y(box));
    }
    ;
    exports.default = Rectangle;
});
