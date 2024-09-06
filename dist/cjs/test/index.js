(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./tool.js", "./Vector2D.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const tool_js_1 = require("./tool.js");
    const Vector2D_js_1 = require("./Vector2D.js");
    Vector2D_js_1.default;
    (0, tool_js_1.finish)();
});
