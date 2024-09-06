var _a;
const __x__ = new WeakMap(), __y__ = new WeakMap();
class Vector2D {
    constructor(...args) {
        var _b, _c;
        this.x = ((_b = args[0]) === null || _b === void 0 ? void 0 : _b.x) || args[0];
        this.y = ((_c = args[0]) === null || _c === void 0 ? void 0 : _c.y) || args[1];
    }
    ;
}
_a = Vector2D;
Vector2D.add = (a, b) => new _a(a.x + b.x, a.y + b.y);
Vector2D.sub = (a, b) => new _a(a.x - b.x, a.y - b.y);
Vector2D.hadamard = (a, b) => new _a(a.x * b.x, a.y * b.y);
Vector2D.mag = ({ x, y }) => Math.hypot(x, y);
Vector2D.yaw = ({ x, y }) => Math.atan2(y, x);
Vector2D.scale = ({ x, y }, scale = 1) => {
    switch (true) {
        case !+scale: return new _a();
        case scale === 1: return new _a(x, y);
        case scale === -1: return new _a(-x, -y);
        default: return new _a(x * scale, y * scale);
    }
};
Vector2D.unit = (vec) => _a.scale(vec, 1 / _a.mag(vec));
Vector2D.dot = (a, b) => a.x * b.x + a.y * b.y;
Vector2D.cross = (a, b) => a.x * b.y - a.y * b.x;
Vector2D.toArray = ({ x, y }) => [x, y];
{
    const descriptor = (buffer) => ({
        get() { return buffer.get(this) || 0; },
        set(value) { buffer.set(this, +value || 0); }
    });
    Object.defineProperties(Vector2D.prototype, {
        x: descriptor(__x__),
        y: descriptor(__y__)
    });
}
Vector2D.prototype.add = function add(vec) {
    return Vector2D.add(this, vec);
};
Vector2D.prototype.sub = function sub(vec) {
    return Vector2D.sub(this, vec);
};
Vector2D.prototype.hadamard = function hadamard(vec) {
    return Vector2D.hadamard(this, vec);
};
Vector2D.prototype.yaw = function yaw() {
    return Vector2D.yaw(this);
};
Vector2D.prototype.mag = function mag() {
    return Vector2D.mag(this);
};
Vector2D.prototype.scale = function scale(scale = 1) {
    return Vector2D.scale(this, scale);
};
Vector2D.prototype.unit = function scale() {
    return Vector2D.unit(this);
};
Vector2D.prototype.dot = function dot(vec) {
    return Vector2D.dot(this, vec);
};
Vector2D.prototype.cross = function cross(vec) {
    return Vector2D.cross(this, vec);
};
Vector2D.prototype.toArray = function toArray() {
    return Vector2D.toArray(this);
};
export default Vector2D;
