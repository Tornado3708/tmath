(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./buffer.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const buffer_js_1 = require("./buffer.js");
    class Dimension {
        constructor(...args) {
            buffer_js_1.default.create(this, 'width', 'height');
            switch (args.length) {
                case 0: break;
                case 1: if ('width' in args[0] && 'height' in args[0])
                    args = [args[0].width, args[0].height];
                case 2:
                    [this.width, this.height] = args;
            }
        }
    }
    exports.default = Dimension;
});
