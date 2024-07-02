import Vector2D from "./Vector2D.js";


//TODO Зробити клас
const p2d = (...args: ConstructorParameters<typeof Vector2D>) => new Vector2D(...args);

p2d.distance = (a: Vector2D, b: Vector2D) => Math.hypot(a.x - b.x, a.y - b.y);

export default Object.freeze(p2d);