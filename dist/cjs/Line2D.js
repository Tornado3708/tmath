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
    function createDescriptor() {
        const vectors = [0, 0].map(() => new Vector2D_js_1.default());
        return {
            ['x1']: { set(x1) { vectors[0].x = x1; }, get() { return vectors[0].x; } },
            ['x2']: { set(x2) { vectors[1].x = x2; }, get() { return vectors[1].x; } },
            ['y1']: { set(y1) { vectors[0].y = y1; }, get() { return vectors[0].y; } },
            ['y2']: { set(y2) { vectors[1].y = y2; }, get() { return vectors[1].y; } },
        };
    }
    class Line2D {
        constructor(...args) {
            Object.defineProperties(this, createDescriptor());
            switch (args.length) {
                case 0: return this;
                case 1:
                    this.x1 = args[0].x1;
                    this.x2 = args[0].x2;
                    this.y1 = args[0].y1;
                    this.y2 = args[0].y2;
                case 2:
                    [this.x1, this.y1] = Vector2D_js_1.default.toArray(args[0]);
                    [this.x2, this.y2] = Vector2D_js_1.default.toArray(args[1]);
                default: [this.x1, this.y1, this.x2, this.y2] = args;
            }
        }
    }
    exports.default = Line2D;
});
