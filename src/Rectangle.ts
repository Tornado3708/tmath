import { x, y, width, height } from "./buffers";
import Vector2D from "./Vector2D";
import { HasX, HasY, HasDimension, HasPoint2D, HasRectangle, HasWidth, HasHeight } from "./types";



class Rectangle {
  
  constructor ();
  constructor (width: number, height: number);
  constructor (x: number, y: number, width: number, height: number);
  constructor (dimension: HasDimension);
  constructor (rect: HasRectangle);
  constructor (pos: HasPoint2D, dimension: HasDimension);
  
  constructor (...args: RectangleArgs) {
    x     .set(this, 0);
    y     .set(this, 0);
    width .set(this, 0);
    height.set(this, 0);
    
    switch (args.length) {
      case 0: break;
      case 1:
        if (typeof args[0] === 'object' && args[0]) {
          this.x      = (args[0] as HasRectangle).x;
          this.y      = (args[0] as HasRectangle).y;
          this.width  = args[0].width;
          this.height = args[0].height;
        }

        break;
      case 2:
        if (typeof args[0] === 'object' && args[0]) {
          this.x = args[0].x;
          this.y = args[0].y;
        }

        if (typeof args[1] === 'object' && args[1]) {
          this.width  = args[1].width;
          this.height = args[1].height;
        }

        break;
        default: [this.x, this.y, this.width, this.height] = args;
    }
  }
}

{
  const 
    defaultDescriptor: PropertyDescriptor = { configurable: !1, enumerable: !1 },
    enumerable       : PropertyDescriptor = { configurable: !1, enumerable: !0 };

  const describeValue = <T>(value: T, descriptor = defaultDescriptor) => Object.assign({ value }, descriptor);
  const describeAccessor = (buffer: WeakMap<Rectangle, number>, descriptor = defaultDescriptor) => Object.assign({
    set (this: Rectangle, value: number) { buffer.set(this, +value || 0) },
    get (this: Rectangle)                { return buffer.get(this) || 0; },
  },
  descriptor);

  function oppositeX (this: HasX & HasWidth) {
    return this.x + this.width;
  }

  function oppositeY (this: HasY & HasHeight) {
    return this.y + this.height;
  }


  // todo opposite() {} && {x (): number, y(): number}
  function opposite (this: HasRectangle) {
    return new Vector2D(oppositeX.call(this), oppositeY.call(this));
  };
  
  function centerX (this: HasX & HasWidth) {
    return this.x + this.width * .5;
  }

  function centerY (this: HasY & HasHeight) {
    return this.y + this.height;
  }

  function center (this: HasRectangle) { 
    return new Vector2D(centerX.call(this), centerY.call(this));
  }

  function area (this: HasDimension) {
    return this.width * this.height;
  }

  Object.defineProperties(Rectangle.prototype,{
    x      : describeAccessor(x,      enumerable),
    y      : describeAccessor(y,      enumerable),
    width  : describeAccessor(width,  enumerable),
    height : describeAccessor(height, enumerable),

    opposite : describeValue(opposite),
    center   : describeValue(center),

    area     : describeValue(area)
  });

  Object.defineProperties(Rectangle, {
    opposite: describeValue((rect: HasRectangle) => opposite.call(rect)),
    center : describeValue((rect: HasRectangle) => center.call(rect)),
    
    area : describeValue((rect: HasDimension) => area.call(rect))
  });
}

export default Rectangle;

interface Rectangle {
  x      : number;
  y      : number;
  width  : number;
  height : number;

  opposite (): Vector2D;
  center (): Vector2D;

  area (): number;
}

type RectangleArgs = 
  [] | 
  [width: number, height: number] | 
  [x: number, y: number, width: number, height: number] | 
  [dimension: HasDimension] | 
  [rect: HasRectangle] | 
  [pos: HasPoint2D, dimension: HasDimension];