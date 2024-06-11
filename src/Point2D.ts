import _Vector2D from "./Vector2D.js";
import buffer from "./buffer.js";
import { Vector2D } from "tmath";


const p2d = (x = 0, y = 0): Vector2D => _Vector2D(x, y);

p2d.distance = (a: Vector2D, b: Vector2D) => Math.hypot(a.x - b.x, a.y - b.y);