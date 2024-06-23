import { Vector2D, Line2D, Line2DConstructor } from "tmath";
import _Vector2D from "./Vector2D.js";







const _line2d: Line2DConstructor = (...args) => {

  if (!args.length) return _line2d(0, 0, 0, 0);

  const _points = typeof args[0] === 'object' ? (args as Vector2D[]).map(_Vector2D as (vec: Vector2D) => Vector2D) : [_Vector2D(args[0] as number, args[1] as number), _Vector2D(args[2] as number, args[3] as number)];
  const instance = Object.defineProperties({}, {
    x1: {
      set (value: number) { _points[0].x = value; },
      get () { return _points[0].x; },
    },
    x2: {
      set (value: number) { _points[1].x = value; },
      get () { return _points[1].x; }
    },
    y1: {
      set (value: number) { _points[0].y = value; },
      get () { return _points[0].y; }
    },
    y2: {
      set (value: number) { _points[1].y = value; },
      get () { return _points[1].y; }
    }
  }) as Line2D;

  [instance.x1, instance.y1, instance.x2, instance.y2] = typeof args[0] === 'object' ? (args as [Vector2D, Vector2D]).reduce((a, b) => a.concat(_Vector2D.toArray(b)), [] as number[]) : args as [number, number, number, number];
  return instance;
};

_line2d.points = ({x1, x2, y1, y2}: Line2D) => [_Vector2D(x1, y1), _Vector2D(x2, y2)];
_line2d.duration = (line: Line2D) => _Vector2D.mag(_Vector2D.sub(..._line2d.points(line)));

export default Object.freeze(_line2d);