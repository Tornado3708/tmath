import Dimension from "./Dimension.js";
import Vector2D from "./Vector2D.js";

const 
  __x__      = new WeakMap() as WeakMap<Rectangle, number>,
  __y__      = new WeakMap() as WeakMap<Rectangle, number>,
  __width__  = new WeakMap() as WeakMap<Rectangle, number>,
  __height__ = new WeakMap() as WeakMap<Rectangle, number>;

class Rectangle {

  static opposite = Object.freeze({
    x: Object.freeze(({x, width} : Rectangle)  => x + width),
    y: Object.freeze(({y, height}: Rectangle) => y + height) 
  });

  static center = Object.freeze({
    x: Object.freeze(({x, width} : Rectangle)  => x + width),
    y: Object.freeze(({y, height}: Rectangle) => y + height)
  });

  
  constructor ();
  constructor (width: number, height: number);
  constructor (x: number, y: number, width: number, height: number);
  constructor (dimension: Dimension);
  constructor (rect: Rectangle);
  constructor (pos: Point2D, dimension: Dimension);
  constructor (...args: any[]) {
    
    switch (args.length) {
      case 0 : break;
      case 1: if(typeof args[0] === 'object') {
        this.x      = args[0]?.x;
        this.y      = args[0]?.y;
        this.width  = args[0]?.width;
        this.height = args[0]?.height;
      };
      break;
      
      case 2:
        if (typeof args[0] === 'object' && typeof args[1] === 'object') {
          this.x      = args[0]?.x;
          this.y      = args[0]?.y;
          this.width  = args[1]?.width;
          this.height = args[1]?.height;
        } else {
          [this.width, this.height] = args;
        }
        break;

      default: [this.x, this.y, this.width, this.height] = args;
    }
  }
}

{
  const descriptor = (buffer: WeakMap<Rectangle, number>) => ({
    set (this: Rectangle, value: number) { buffer.set(this, +value || 0) },
    get (this: Rectangle)                { return buffer.get(this) || 0; },
    enumerable: true
  });

  Object.defineProperties(Rectangle.prototype,{
    x      : descriptor(__x__),
    y      : descriptor(__y__),
    width  : descriptor(__width__),
    height : descriptor(__height__)
  });
}


Rectangle.prototype.contains = function contains(this: Rectangle, ...args: [x: number, y: number] | [x: number, y: number, width: number, height: number] | [point: Point2D] | [rect: Rectangle]) {
  if (!args.length) return false;

  switch (args.length) {
    case 1: return 'width' in args[0] && 'height' in args[0]
      ? rectContains(this, args[0].x, args[0].y, args[0].width, args[0].height)
      : pointContains(this, args[0].x, args[0].y);
    case 2: return pointContains(this, ...args);
    default: return rectContains(this, ...args);
  }
}


Rectangle.prototype.intersects = function intersects (this: Rectangle, ...args: [x: number, y: number, width: number, height: number] | [rect: {x: number, y: number; width: number; height: number}]) {
  switch (args.length) {
    case 1:
      if('x' in args[0] && 'y' in args[0] && 'width' in args[0] && 'height' in args[0])
        return __intersects__(this, +args[0].x, +args[0].y, +args[0].width, +args[0].height);
      throw Error ('Parameter is not rectangle.');
    case 4:
      return __intersects__(this, ...args);
    default: throw Error ('Parameter(s) are not matching.');
  }
}


Rectangle.prototype.getBounds = function getBounds (this: Rectangle) { return new Rectangle(this); };
Rectangle.prototype.transform = function* transform (this: Rectangle, affineTransform: [number, number, number, number ,number, number]) {
    for (let i = 0; i < 4; i++) {
      switch (i) {
        case 0: yield new Vector2D(...affine(this.x + this.width, this.y              , affineTransform));
          break;
        case 1: yield new Vector2D(...affine(this.x             , this.y              , affineTransform));
          break;
        case 2: yield new Vector2D(...affine(this.x             , this.y + this.height, affineTransform));
          break;
        case 3: yield new Vector2D(...affine(this.x + this.width, this.y + this.height, affineTransform));
          break;
      // }
    }
  }
}


function affine (x: number, y: number, m: [number, number, number, number, number, number]): [number, number] {
  return [
    x * m[0] + x * m[2] + m[4],
    y * m[1] + y * m[3] + m[5]
  ];
}


function __intersects__ (rect: Rectangle, x: number, y: number, width: number, height: number) {
  return (rect.x < x + width || rect.x + rect.width > x) && (rect.y < y + height || rect.y + rect.width > y);
}


function pointContains (rect: Rectangle, x: number, y: number) {
  return (
    x >= rect.x && x <= Rectangle.opposite.x(rect) &&
    y >= rect.y && y <= Rectangle.opposite.y(rect)
  );
}

function rectContains (box: Rectangle, x: number, y: number, width: number, height: number) {
  return (
    x >= box.x && x + width  <= Rectangle.opposite.x(box) &&
    y >= box.y && y + height <= Rectangle.opposite.y(box)
  );
};



export default Rectangle;

interface Rectangle extends Shape {
  x      : number;
  y      : number;
  width  : number;
  height : number;
  prototype: Rectangle;
}