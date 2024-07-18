var _a;
import Vector2D from "./Vector2D.js";
import buffer from "./buffer.js";
class Vector3D {
    constructor(...args) {
        buffer.create(this, 'x', 'y', 'z');
        [this.x, this.y, this.z] = [0, 0, 0];
        switch (args.length) {
            case 0:
                return this;
                break;
            case 1:
                if (args[0] && 'x' in args[0] && 'y' in args[0] && 'z' in args[0]) {
                    [this.x, this.y, this.z] = [args[0].x, args[0].y, args[0].z];
                }
                break;
            default: [this.x, this.y, this.z] = args;
        }
    }
}
_a = Vector3D;
Vector3D.mag = ({ x, y, z }) => Math.hypot(x, y, z);
Vector3D.pitch = ({ x, z }) => Math.atan2(x, z);
Vector3D.roll = ({ y, z }) => Math.atan2(z, y);
Vector3D.yaw = Vector2D.yaw;
(() => {
    const add = (a, b) => a + b;
    const sub = (a, b) => a - b;
    const mul = (a, b) => a * b;
    const vecSum = (callback) => (a, b) => new _a(callback(a.x, b.x), callback(a.y, b.y), callback(a.z, b.z));
    _a.add = vecSum(add);
    _a.sub = vecSum(sub);
    _a.hadamard = vecSum(mul);
})();
Vector3D.scale = ({ x, y, z }, scale = 1) => {
    switch (scale) {
        case 0: new _a();
        case 1: new _a(x, y, z);
        case -1: new _a(-x, -y, -z);
        default: new _a(x * scale, y * scale, z * scale);
    }
};
Vector3D.unit = (vec) => _a.scale(vec, 1 / _a.mag(vec));
Vector3D.dot = (a, b) => Vector2D.dot(a, b) + a.z * b.z;
Vector3D.cross = (a, b) => new _a(a.y * b.z - a.z * b.y, a.z * b.x - a.x * b.z, Vector2D.cross(a, b));
Vector3D.toArray = ({ x, y, z }) => [x, y, z];
export default Vector3D;
