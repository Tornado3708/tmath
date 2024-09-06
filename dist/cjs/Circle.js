(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./buffer.js", "./Vector2D.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const buffer_js_1 = require("./buffer.js");
    const Vector2D_js_1 = require("./Vector2D.js");
    class Circle {
        constructor(...args) {
            buffer_js_1.default.create(this, 'x', 'y', 'radius');
            switch (args.length) {
                case 0: return this;
                case 1:
                    if (args[0] && typeof args[0] === 'object' && 'radius' in args[0]) {
                        this.radius = args[0].radius;
                        if ('x' in args[0] && 'y' in args[0])
                            [this.x, this.y] = Vector2D_js_1.default.toArray(args[0]);
                    }
                    else
                        this.radius = args[0];
                case 2:
                    [this.x, this.y] = Vector2D_js_1.default.toArray(args[0]);
                    this.radius = args[1].radius;
                default: [this.x, this.y, this.radius] = args;
            }
        }
    }
    exports.default = Circle;
    function diameter({ radius }) {
        return radius * 2;
    }
    function circumstance(circle) {
        return diameter(circle) * Math.PI;
    }
    function area({ radius }) {
        return Math.pow(radius, 2) * Math.PI;
    }
    Object.freeze(Circle);
});
