import buffer from "./buffer.js";
import { HasHeight, HasWidth, HasX, HasY, Rectangle, RectangleConstructor, Vector2D, Dimension } from "tmath";


type RectangleParameters = [width: number, height: number] | [x: number, y: number, width: number, height: number] | [dimension: Dimension] | [pos: Vector2D, dimension: Dimension] | [rectangle: Rectangle] | [];
const rectangle: RectangleConstructor = (...args: RectangleParameters) => {
  if (!args.length) return rectangle(0, 0, 0, 0);

  if (typeof args[0] !== 'object') {
    const rect = buffer.create('x', 'y', 'width', 'height') as Rectangle;
    [rect.x, rect.y, rect.width, rect.height] = ((args.length > 3) ? args : [0, 0, ...args]) as [number, number, number, number];
    return rect;
  }

  const _args: number[] = [];
  if ('x' in (args[0] as HasX) && 'y' in (args[0] as HasY)) {
    _args.push((args[0] as HasX).x, (args[0] as HasY).y);
  }
  if ('width' in (args[0] as HasWidth) && 'height' in (args[0] as HasHeight)) {
    _args.push((args[0] as HasWidth).width, (args[0] as HasHeight).height);
  } else if ('width' in (args[1] as HasWidth) && 'height' in (args[1] as HasHeight)) {
    _args.push((args[1] as HasWidth).width, (args[1] as HasHeight).height);
  }

  return rectangle(..._args as [number, number, number, number]);

};



{ 
  const compose = (...funcs: ((arg: any) => any)[]) => (arg: any) => funcs.reduceRight((a, f) => f(a), arg);
  
  const centerX = ({x, width}: HasX & HasWidth) => x + width * .5;
  const centerY = ({y, height}: HasY & HasHeight) => y + height * .5;
  const oppositeX = ({x, width}: HasX & HasWidth) => x + width;
  const oppositeY = ({y, height}: HasY & HasHeight) => y + height;
  
  const centerModifier = { x: { value: centerX }, y: { value: centerY } };
  const oppositeModifier = { x: { value: oppositeX }, y: { value: oppositeY } };
  
  rectangle.center   = compose(Object.freeze, (arg: any) => Object.defineProperties(arg, centerModifier))   ((rect: Rectangle) => Vector2D(centerX(rect), centerY(rect)));
  rectangle.opposite = compose(Object.freeze, (arg: any) => Object.defineProperties(arg, oppositeModifier)) ((rect: Rectangle) => Vector2D(oppositeX(rect), oppositeY(rect)));

}



rectangle.area = ({width, height}: Dimension) => width * height;
rectangle.diagonal = ({width, height}: Dimension) => Math.hypot(width, height);


export default Object.freeze(rectangle);