"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Vector2D_js_1 = __importDefault(require("./Vector2D.js"));
const p2d = (x = 0, y = 0) => (0, Vector2D_js_1.default)(x, y);
p2d.distance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
