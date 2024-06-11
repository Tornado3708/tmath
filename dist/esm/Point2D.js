import _Vector2D from "./Vector2D.js";
const p2d = (x = 0, y = 0) => _Vector2D(x, y);
p2d.distance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
