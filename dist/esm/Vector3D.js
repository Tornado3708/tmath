var _a;
import Vector2D from "./Vector2D.js";
const __x__ = new WeakMap(), __y__ = new WeakMap(), __z__ = new WeakMap();
class Vector3D {
    constructor(...args) {
        var _b, _c, _d;
        this.x = ((_b = args[0]) === null || _b === void 0 ? void 0 : _b.x) || args[0];
        this.y = ((_c = args[0]) === null || _c === void 0 ? void 0 : _c.y) || args[1];
        this.z = ((_d = args[0]) === null || _d === void 0 ? void 0 : _d.z) || args[2];
    }
}
_a = Vector3D;
Vector3D.mag = ({ x, y, z }) => Math.hypot(x, y, z);
Vector3D.pitch = ({ x, z }) => Math.atan2(x, z);
Vector3D.roll = ({ y, z }) => Math.atan2(z, y);
Vector3D.yaw = Vector2D.yaw;
Vector3D.add = (a, b) => new _a(a.x + b.x, a.y + b.y, a.z + b.z);
Vector3D.sub = (a, b) => new _a(a.x - b.x, a.y - b.y, a.z - b.z);
Vector3D.hadamard = (a, b) => new _a(a.x * b.x, a.y * b.y, a.z * b.z);
Vector3D.scale = ({ x, y, z }, scale = 1) => {
    switch (scale) {
        case 0: return new _a();
        case 1: return new _a(x, y, z);
        case -1: return new _a(-x, -y, -z);
        default: return new _a(x * scale, y * scale, z * scale);
    }
};
Vector3D.unit = (vec) => _a.scale(vec, 1 / _a.mag(vec));
Vector3D.dot = (a, b) => Vector2D.dot(a, b) + a.z * b.z;
Vector3D.cross = (a, b) => new _a(a.y * b.z - a.z * b.y, a.z * b.x - a.x * b.z, Vector2D.cross(a, b));
Vector3D.toArray = ({ x, y, z }) => [x, y, z];
{
    const descriptor = (buffer) => ({
        set(value) { buffer.set(this, +value || 0); },
        get() { return buffer.get(this) || 0; }
    });
    Object.defineProperties(Vector3D.prototype, {
        x: descriptor(__x__),
        y: descriptor(__y__),
        z: descriptor(__z__)
    });
}
Vector3D.prototype.add = function add(vec) {
    return Vector3D.add(this, vec);
};
Vector3D.prototype.sub = function sub(vec) {
    return Vector3D.sub(this, vec);
};
Vector3D.prototype.hadamard = function hadamard(vec) {
    return Vector3D.hadamard(this, vec);
};
export default Vector3D;
