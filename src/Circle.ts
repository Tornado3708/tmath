import { HasRadius, HasPoint2D } from "./types.js";
import { x, y, radius } from "./buffers";

class Circle {

  constructor ();
  constructor (radius: number);
  constructor (x: number, y: number, radius: number);
  constructor (hasRadius: HasRadius);
  constructor (circle: HasPoint2D & HasRadius);
  constructor (pos: HasPoint2D, hasRadius: HasRadius);

  constructor (...args: any[]) {
    x     .set(this, 0);
    y     .set(this, 0);
    radius.set(this, 0);
    
    if (typeof args[0] === 'object' && args[0]) {
      this.x = args[0]?.x;
      this.y = args[0]?.y;
      this.radius = args[ +(typeof args[1] === 'object' && args[1]) ]?.radius;
    }
    else {
      [this.x, this.y, this.radius] = args;
    }
  }
}



{
  const 
    defaultDescriptor: PropertyDescriptor = { configurable : !1, enumerable : !1 },
    enumerable       : PropertyDescriptor = { configurable : !1, enumerable : !0 },
    describeValue = <T>(value: T, descriptor: PropertyDescriptor = defaultDescriptor) => ({ ...descriptor, value }),
    describeAccessor = (buffer: WeakMap<Circle, number>, descriptor: PropertyDescriptor = defaultDescriptor) => {
      return (Object.assign({
        set (this: Circle, value: number) { buffer.set(this, +value || 0) },
        get (this: Circle)                { return buffer.get(this) || 0 }
      },
      descriptor))};
  

  function diameter     (this: HasRadius) { return this.radius *  2};
  function circumstance (this: HasRadius) { return this.radius *  2 * Math.PI};
  function area         (this: HasRadius) { return this.radius ** 2 * Math.PI};

  Object.assign(Circle.prototype, {
    x            : describeAccessor(x     , enumerable),
    y            : describeAccessor(y     , enumerable),
    radius       : describeAccessor(radius, enumerable),
    diameter     : describeValue(diameter    , defaultDescriptor),
    circumstance : describeValue(circumstance, defaultDescriptor),
    area         : describeValue(area        , defaultDescriptor)
  });
}

export default Circle;

interface Circle {
  x:      number;
  y:      number; 
  radius: number;

  diameter    (): number;
  circumstance(): number;
  area        (): number;
}