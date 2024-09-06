(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../Vector2D.js", "./tool.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Vector2D_js_1 = require("../Vector2D.js");
    const tool_js_1 = require("./tool.js");
    const a = new Vector2D_js_1.default();
    const b = new Vector2D_js_1.default(1, 2);
    const samePosition = (a, b) => a.x === b.x && a.y === b.y;
    const sameNumber = (a, b) => a === b;
    (0, tool_js_1.test)('Vector2D contructor empty')(samePosition)(a)({ x: 0, y: 0 });
    (0, tool_js_1.test)('Vector2D constructor num')(samePosition)(b)({ x: 1, y: 2 });
    (0, tool_js_1.test)('Vector2D constructor vec')(samePosition)(new Vector2D_js_1.default(b))(b);
    (0, tool_js_1.test)('Vector2D static add')(samePosition)(Vector2D_js_1.default.add(b, b))({ x: 2, y: 4 });
    (0, tool_js_1.test)('Vector2D static sub')(samePosition)(Vector2D_js_1.default.sub(new Vector2D_js_1.default(3, 5), b))({ x: 2, y: 3 });
    (0, tool_js_1.test)('Vector2D static hadamard')(samePosition)(Vector2D_js_1.default.hadamard(new Vector2D_js_1.default(3, 5), new Vector2D_js_1.default(3, 2)))({ x: 9, y: 10 });
    (0, tool_js_1.test)('Vector2D static mag')(sameNumber)(Vector2D_js_1.default.mag(b))(Math.sqrt(5));
    (0, tool_js_1.test)('Vector2D static yaw')(sameNumber)(Vector2D_js_1.default.yaw(b))(Math.atan2(2, 1));
    (0, tool_js_1.test)('Vector2D static scale')(samePosition)(Vector2D_js_1.default.scale(b, -2))({ x: -2, y: -4 });
    (0, tool_js_1.test)('Vector2D static unit')(samePosition)(Vector2D_js_1.default.unit(b))({ x: 1 / Math.sqrt(5), y: 2 / Math.sqrt(5) });
    (0, tool_js_1.test)('Vector2D static toArray')((a, b) => a[0] === b[0] && a[1] === b[1])(Vector2D_js_1.default.toArray(b))([1, 2]);
    exports.default = {};
});
