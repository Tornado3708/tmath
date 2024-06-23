import _Vector2D from "./Vector2D.js";
import {Vector2D, Vector2DParameters} from "tmath";

const p2d = (...args: Vector2DParameters) => _Vector2D(...args);

p2d.distance = (a: Vector2D, b: Vector2D) => Math.hypot(a.x - b.x, a.y - b.y);

export default Object.freeze(p2d);