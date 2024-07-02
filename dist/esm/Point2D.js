import Vector2D from "./Vector2D.js";
//TODO Зробити клас
const p2d = (...args) => new Vector2D(...args);
p2d.distance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
export default Object.freeze(p2d);
//# sourceMappingURL=Point2D.js.map