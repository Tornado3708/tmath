import buffer from "./buffer.js";
const _circle = (...args) => {
    if (!args.length)
        return _circle(0, 0, 0);
    if (typeof args[0] !== 'object') {
        const c = buffer.create('x', 'y', 'radius');
        [c.radius, c.x, c.y] = ((args.length > 2) ? [...args] : [args[0], 0, 0]);
        return c;
    }
    const _args = [];
    if ('radius' in args[0]) {
        _args.push(args[0].radius);
        if ('x' in args[0] && 'y' in args[0]) {
            _args.push(args[0].x, args[0].y);
        }
    }
    return _circle(..._args);
};
_circle.diameter = ({ radius }) => radius * 2;
_circle.circumstance = (circle) => _circle.diameter(circle) * Math.PI;
export default Object.freeze(_circle);
