import buffer from "./buffer.js";
import Vector2D from "./Vector2D.js";
import Dimension from "./Dimension.js";

type RectangleParameters = [width: number, y: number] | [x: number, y: number, width: number, height: number] | [dimension: Dimension] | [rect: Rectangle] | [vec: Vector2D, dimension: Dimension] | [];


class Rectangle {

  static opposite = Object.freeze({
    x: Object.freeze(({x, width} : HasX & HasWidth)  => x + width),
    y: Object.freeze(({y, height}: HasY & HasHeight) => y + height) 
  });

  static center = Object.freeze({
    x: Object.freeze(({x, width} : HasX & HasWidth)  => x + width),
    y: Object.freeze(({y, height}: HasY & HasHeight) => y + height)
  });

  static area = ({width, height}: Dimension) => width * height;

  
  x!      :number;
  y!      :number;
  width!  :number;
  height! :number;
  
  constructor (...args: RectangleParameters) {
    buffer.create(this, 'x', 'y', 'width', 'height');

    if (!args.length) return this;

    if (args[0] && typeof args === 'object') {
      const index = +((args.length !== 1) as boolean) as 0 | 1;
      [this.x, this.y, this.width, this.height] = [+(args[0] as HasX).x || 0, +(args[0] as HasY).y || 0, +(args[index] as HasWidth).width || 0, +(args[index] as HasHeight).height || 0];
      return this;
    }

    if (args.length < 2) return this;
    [this.x, this.y, this.width, this.height] = args.length < 4 ? [0, 0].concat(args as [number, number]) : args as [number, number, number, number];
  }
}

export default Rectangle;