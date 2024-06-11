import { Circle, CircleConstructor, HasRadius, HasX, HasY } from "tmath";
import buffer from "./buffer.js";



const _circle: CircleConstructor = (...args) => {
  if (!args.length) return _circle(0, 0, 0);

  if (typeof args[0] !== 'object') {
    const c = buffer.create('x', 'y', 'radius') as Circle;
    [c.radius, c.x, c.y] = ((args.length > 2) ? [...args] : [args[0], 0, 0]) as [number, number, number];
    return c;
  }

  const _args: number[] = [];
  if ('radius' in (args[0] as HasRadius)) {
    _args.push((args[0] as HasRadius).radius);

    if ('x' in (args[0] as HasX) && 'y' in (args[0] as HasY)) {
      _args.push((args[0] as HasX).x, (args[0] as HasY).y);
    }
  }

  return _circle(..._args as [number, number, number]);
};


_circle.diameter = ({ radius }: HasRadius) => radius * 2;
_circle.circumstance = (circle: HasRadius) => _circle.diameter(circle) * Math.PI; 


export default Object.freeze(_circle);