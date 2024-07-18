"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Vector2D_js_1 = require("./Vector2D.js");
//TODO Зробити клас
const p2d = (...args) => new Vector2D_js_1.default(...args);
p2d.distance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
exports.default = Object.freeze(p2d);
