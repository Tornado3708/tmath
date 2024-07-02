import buffer from "./buffer.js";
import Vector2D from "./Vector2D.js";
export default class Circle {
    constructor(...args) {
        buffer.create(this, 'x', 'y', 'radius');
        switch (args.length) {
            case 0: return this;
            case 1:
                if (args[0] && typeof args[0] === 'object' && 'radius' in args[0]) {
                    this.radius = args[0].radius;
                    if ('x' in args[0] && 'y' in args[0])
                        [this.x, this.y] = Vector2D.toArray(args[0]);
                }
                else
                    this.radius = args[0];
            case 2:
                [this.x, this.y] = Vector2D.toArray(args[0]);
                this.radius = args[1].radius;
            default: [this.x, this.y, this.radius] = args;
        }
    }
}
function diameter({ radius }) {
    return radius * 2;
}
function circumstance(circle) {
    return diameter(circle) * Math.PI;
}
function area({ radius }) {
    return Math.pow(radius, 2) * Math.PI;
}
Object.freeze(Circle);
//# sourceMappingURL=Circle.js.map