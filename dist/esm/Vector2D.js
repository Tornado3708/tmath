var _a;
import buffer from "./buffer.js";
class Vector2D {
    constructor(...args) {
        buffer.create(this, 'x', 'y');
        [this.x, this.y] = [0, 0];
        switch (args.length) {
            case 0:
                return this;
                break;
            case 1:
                if (args[0] && 'x' in args[0] && 'y' in args[0])
                    [this.x, this.y] = _a.toArray(args[0]);
                break;
            default: [this.x, this.y] = args;
        }
        ;
    }
    ;
}
_a = Vector2D;
(() => {
    const [add, sub, mul] = [(a, b) => a + b, (a, b) => a - b, (a, b) => a * b];
    const vecSum = (callback) => (a, b) => new _a(callback(a.x, b.x), callback(a.y, b.y));
    _a.add = vecSum(add);
    _a.sub = vecSum(sub);
    _a.hadamard = vecSum(mul);
})();
Vector2D.mag = ({ x, y }) => Math.hypot(x, y);
Vector2D.yaw = ({ x, y }) => Math.atan2(y, x);
Vector2D.scale = ({ x, y }, scale = 1) => {
    switch (scale) {
        case 0: return new _a();
        case 1: return new _a(x, y);
        case -1: return new _a(-x, -y);
        default: return new _a(x * scale, y * scale);
    }
};
Vector2D.dot = (a, b) => a.x * b.x + a.y + b.y;
Vector2D.cross = (a, b) => a.x * b.y - a.y * b.x;
Vector2D.toArray = ({ x, y }) => [x, y];
export default Vector2D;
