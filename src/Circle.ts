import { CircleConstructor, Circle, HasRadius, HasX, HasY } from "tmath";
import buffer from "./buffer.js";
import Point2D from "./Point2D.js";


const _circle: CircleConstructor = (...args) => {
  if (!args.length) return _circle(0, 0, 0);

  if (typeof args[0] !== 'object') {
    const c = buffer.create('x', 'y', 'radius') as Circle;
    [c.radius, c.x, c.y] = ((args.length > 2) ? [...args] : [args[0], 0, 0]) as [number, number, number];
    return c;
  }

  const _args: number[] = [];
  if (Reflect.has(args[0], 'radius')) {
    _args.push((args[0] as HasRadius).radius);

    if (Reflect.has(args[0], 'x') && 'y' in (args[0] as HasY)) {
      _args.push((args[0] as HasX).x, (args[0] as HasY).y);
    }
  }

  return _circle(..._args as [number, number, number]);
};


_circle.diameter = ({ radius }: HasRadius) => radius * 2;
_circle.circumstance = (circle: HasRadius) => _circle.diameter(circle) * Math.PI; 
_circle.area = ({ radius }) => Math.PI * Math.pow(radius, 2);
_circle.distance = (a: Circle, b: Circle) => Point2D.distance(a, b) - (a.radius + b.radius);

export default Object.freeze(_circle);