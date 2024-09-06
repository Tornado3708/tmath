(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./Vector2D.js", "./Vector3D.js", "./Line2D.js", "./Circle.js", "./Rectangle.js", "./Dimension.js", "./Matrix.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Matrix = exports.Dimension = exports.Rectangle = exports.Circle = exports.Line2D = exports.Vector3D = exports.Vector2D = void 0;
    const Vector2D_js_1 = require("./Vector2D.js");
    const Vector3D_js_1 = require("./Vector3D.js");
    const Line2D_js_1 = require("./Line2D.js");
    const Circle_js_1 = require("./Circle.js");
    const Rectangle_js_1 = require("./Rectangle.js");
    const Dimension_js_1 = require("./Dimension.js");
    const Matrix_js_1 = require("./Matrix.js");
    exports.Vector2D = Vector2D_js_1.default;
    exports.Vector3D = Vector3D_js_1.default;
    exports.Line2D = Line2D_js_1.default;
    exports.Circle = Circle_js_1.default;
    exports.Rectangle = Rectangle_js_1.default;
    exports.Dimension = Dimension_js_1.default;
    exports.Matrix = Matrix_js_1.default;
});
