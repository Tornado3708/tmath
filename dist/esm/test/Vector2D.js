import Vector2D from "../Vector2D.js";
import { test } from "./tool.js";
test('Vector2D contructor empty')((a, b) => {
    return a.x === 0 && a.y === 0 &&
        a.x === b.x && a.y === b.y;
})(new Vector2D())(new Vector2D(0, 0));
test('Vector2D constructor vec')((a, b) => {
    return a.x === b.x && a.y === b.y;
})(new Vector2D(5, 2))({ x: 5, y: 2 });
export default {};
