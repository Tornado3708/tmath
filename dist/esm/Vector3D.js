import Vector2D from "./Vector2D.js";
import buffer from "./buffer.js";
const _vector3d = (...args) => {
    if (!args.length)
        return _vector3d(0, 0, 0);
    if (typeof args[0] !== 'object') {
        const vec = buffer.create('x', 'y', 'z');
        [vec.x, vec.y, vec.z] = [...args];
        return vec;
    }
    else
        return _vector3d(args[0].x, args[0].y, args[0].z);
};
_vector3d.mag = ({ x, y, z }) => Math.hypot(x, y, z);
_vector3d.pitch = ({ x, z }) => Math.atan2(x, z);
_vector3d.roll = ({ y, z }) => Math.atan2(z, y);
_vector3d.yaw = Vector2D.yaw;
{
    const abstractAddition = (callback) => (a, b) => _vector3d(callback(a.x, b.x), callback(a.y, b.y), callback(a.z, b.z));
    _vector3d.add = abstractAddition((a, b) => a + b);
    _vector3d.sub = abstractAddition((a, b) => a - b);
    _vector3d.hadamard = abstractAddition((a, b) => a * b);
}
{
    const divArr = (arr, fraq) => arr.map(x => x * fraq);
    _vector3d.unit = ({ x, y, z }) => _vector3d(...divArr([x, y, z], 1 / Math.hypot(x, y, z)));
}
_vector3d.dot = (a, b) => Vector2D.dot(a, b) + a.z * b.z;
_vector3d.cross = (a, b) => _vector3d(a.y * b.z - a.z * b.y, a.z * b.x - a.x * b.z, Vector2D.cross(a, b));
_vector3d.toArray = ({ x, y, z }) => [x, y, z];
export default Object.freeze(_vector3d);
//# sourceMappingURL=Vector3D.js.map