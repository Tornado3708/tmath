import buffer from "./buffer.js";
import { Vector2D } from "tmath";
const rectangle = (...args) => {
    if (!args.length)
        return rectangle(0, 0, 0, 0);
    if (typeof args[0] !== 'object') {
        const rect = buffer.create('x', 'y', 'width', 'height');
        [rect.x, rect.y, rect.width, rect.height] = ((args.length > 3) ? args : [0, 0, ...args]);
        return rect;
    }
    const _args = [];
    if ('x' in args[0] && 'y' in args[0]) {
        _args.push(args[0].x, args[0].y);
    }
    if ('width' in args[0] && 'height' in args[0]) {
        _args.push(args[0].width, args[0].height);
    }
    else if ('width' in args[1] && 'height' in args[1]) {
        _args.push(args[1].width, args[1].height);
    }
    return rectangle(..._args);
};
{
    const compose = (...funcs) => (arg) => funcs.reduceRight((a, f) => f(a), arg);
    const centerX = ({ x, width }) => x + width * .5;
    const centerY = ({ y, height }) => y + height * .5;
    const oppositeX = ({ x, width }) => x + width;
    const oppositeY = ({ y, height }) => y + height;
    const centerModifier = { x: { value: centerX }, y: { value: centerY } };
    const oppositeModifier = { x: { value: oppositeX }, y: { value: oppositeY } };
    rectangle.center = compose(Object.freeze, (arg) => Object.defineProperties(arg, centerModifier))((rect) => Vector2D(centerX(rect), centerY(rect)));
    rectangle.opposite = compose(Object.freeze, (arg) => Object.defineProperties(arg, oppositeModifier))((rect) => Vector2D(oppositeX(rect), oppositeY(rect)));
}
rectangle.area = ({ width, height }) => width * height;
rectangle.diagonal = ({ width, height }) => Math.hypot(width, height);
export default Object.freeze(rectangle);
