"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Vector2D_js_1 = require("../Vector2D.js");
const tool_js_1 = require("./tool.js");
(0, tool_js_1.test)('Vector2D contructor empty')((a, b) => {
    return a.x === 0 && a.y === 0 &&
        a.x === b.x && a.y === b.y;
})(new Vector2D_js_1.default())(new Vector2D_js_1.default(0, 0));
(0, tool_js_1.test)('Vector2D constructor vec')((a, b) => {
    return a.x === b.x && a.y === b.y;
})(new Vector2D_js_1.default(5, 2))({ x: 5, y: 2 });
exports.default = {};
