import { HasPoint2D } from "./types";
import { x, y } from "./buffers";



class Vector2D {

  static add     : (a: HasPoint2D, b: HasPoint2D) => number;
  static sub     : (a: HasPoint2D, b: HasPoint2D) => number;
  static hadamard: (a: HasPoint2D, b: HasPoint2D) => number;
  
  static mag: (vec: HasPoint2D) => number;
  static yaw: (vec: HasPoint2D) => number;

  static scale: (vec: HasPoint2D, scale?: number) => Vector2D;
  static unit: (vec: HasPoint2D) => Vector2D;

  static dot  : (a: HasPoint2D, b: HasPoint2D) => number;
  static cross: (a: HasPoint2D, b: HasPoint2D) => number;


  constructor();
  constructor(x: number, y: number);
  constructor(vec: HasPoint2D);
  constructor (...args: any[]) {
      x.set(this, 0);
      y.set(this, 0);  
      if(args.length === 1) {
        if (typeof args[0] !== 'object' || !args[0]) {return this; }

        this.x = args[0].x;
        this.y = args[0].y;
        
      }
      else {
        [this.x, this.y] = args;
      }
  };
}



{
  const describeAccessor = (buffer: WeakMap<Vector2D, number>, descriptor: PropertyDescriptor = defaultDescriptor) => {
    return Object.assign({
      set (this: Vector2D, value: number) { buffer.set(this, +value || 0) },
      get (this: Vector2D)                { return buffer.get(this) || 0 },
    }, descriptor)
  };

  const 
    defaultDescriptor: PropertyDescriptor = { configurable: !1, enumerable: !1 },
    enumerable       : PropertyDescriptor = { configurable: !1, enumerable: !0 };
  const describeValue = <T>(value: T, descriptor: PropertyDescriptor = defaultDescriptor) => ( {...descriptor, value} );

  function add      (this: HasPoint2D, vec: HasPoint2D) { return new Vector2D(this.x + vec.x, this.y + vec.y) }
  function sub      (this: HasPoint2D, vec: HasPoint2D) { return new Vector2D(this.x - vec.x, this.y - vec.y) }
  function hadamard (this: HasPoint2D, vec: HasPoint2D) { return new Vector2D(this.x * vec.x, this.y * vec.y) }

  function scale (this: HasPoint2D, scale: number) { return new Vector2D(this.x * scale, this.y * scale) }


  function unit (this: HasPoint2D) { return scale.call(this, 1 / Math.hypot(this.x, this.y)) || 0 }

  function mag(this: HasPoint2D) { return Math.hypot(this.x, this.y) || 0 }
  function yaw(this: HasPoint2D) { return Math.atan2(this.y, this.x) }

  function dot   (this: HasPoint2D, vec: HasPoint2D) { return this.x * vec.x + this.y * vec.y }
  function cross (this: HasPoint2D, vec: HasPoint2D) { return this.x * vec.y - this.y * vec.x }


  Object.defineProperties(Vector2D.prototype, {
    x       : describeAccessor(x, enumerable),
    y       : describeAccessor(y, enumerable), 
    add     : describeValue(add),
    sub     : describeValue(sub),
    hadamard: describeValue(hadamard),
    scale   : describeValue(scale),
    unit    : describeValue(unit),
    mag     : describeValue(mag),
    yaw     : describeValue(yaw),
    dot     : describeValue(dot),
    cross   : describeValue(cross),
  });

  
  Object.defineProperties(Vector2D, {
    add     : describeValue((a: HasPoint2D, b: HasPoint2D) => add.call(a, b)),
    sub     : describeValue((a: HasPoint2D, b: HasPoint2D) => sub.call(a, b)),
    hadamard: describeValue((a: HasPoint2D, b: HasPoint2D) => hadamard.call(a, b)),
    scale   : describeValue((vec: HasPoint2D, _scale: number = 1) => scale.call(vec, _scale)),
    unit    : describeValue((vec: HasPoint2D) => unit.call(vec)),
    mag     : describeValue((vec: HasPoint2D) => mag.call(vec)),
    yaw     : describeValue((vec: HasPoint2D) => yaw.call(vec)),
    dot     : describeValue((a: HasPoint2D, b: HasPoint2D) => dot.call(a, b)),
    cross   : describeValue((a: HasPoint2D, b: HasPoint2D) => cross.call(a, b))
  });
}


export default Vector2D;


interface Vector2D extends HasPoint2D {

  add (vec: HasPoint2D)     : Vector2D;
  sub (vec: HasPoint2D)     : Vector2D;
  hadamard (vec: HasPoint2D): Vector2D;

  scale (scale: number): Vector2D;
  unit (): Vector2D;

  yaw (): number;
  mag (): number;

  dot   (vec: HasPoint2D): number;
  cross (vec: HasPoint2D): number;
}