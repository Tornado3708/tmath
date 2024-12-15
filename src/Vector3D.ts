import { HasPoint3D } from "./types.js";
import Vector2D from "./Vector2D";
import { x, y, z } from "./buffers";



class Vector3D {
  static mag   : (vec: HasPoint3D) => number;
  static pitch : (vec: HasPoint3D) => number;
  static roll  : (vec: HasPoint3D) => number;
  static yaw   : (vec: HasPoint3D) => number;

  
  static add      : (a: HasPoint3D, b: HasPoint3D) => Vector3D;
  static sub      : (a: HasPoint3D, b: HasPoint3D) => Vector3D;
  static hadamard : (a: HasPoint3D, b: HasPoint3D) => Vector3D;


  static scale : (vec: HasPoint3D, scale?: number) => Vector3D;
  static unit  : (vec: HasPoint3D) => Vector3D;

  static dot   = (a: HasPoint3D, b: HasPoint3D) => Vector2D.dot(a, b) + a.z * b.z;
  static cross = (a: HasPoint3D, b: HasPoint3D) => new Vector3D(a.y * b.z - a.z * b.y, a.z * b.x - a.x * b.z, Vector2D.cross(a, b));

  constructor ();
  constructor (x: number, y: number, z: number);
  constructor (vec: HasPoint3D);
  constructor (...args: any[]) {
      x.set(this, 0);
      y.set(this, 0);
      z.set(this, 0); 
      
      if(args.length === 1) {
        if (typeof args[0] !== 'object' || !args[0]) {
          return this
        }

        this.x = args[0].x;
        this.y = args[0].y;
        this.z = args[0].z;
      }
      else {
        [this.x, this.y, this.z] = args;
      }
  }
}


{
  const 
    defaultDescriptor: PropertyDescriptor = { configurable: !1, enumerable: !1 },
    enumerable       : PropertyDescriptor = { configurable: !1, enumerable: !1 }; 
  
  const describeAccessor = (buffer: WeakMap<Vector3D, number>, descriptor = defaultDescriptor) => {
    return Object.assign({
      set (this: Vector3D, value: number) { buffer.set(this, +value || 0) },
      get (this: Vector3D)                { return buffer.get(this) || 0 }
  }, descriptor)};

  const describeValue = <T>(value: T, descriptor = defaultDescriptor) => ( { ...descriptor, value } );

  function add (this: HasPoint3D , vec: HasPoint3D) {
    return new Vector3D(this.x + vec.x, this.y + vec.y, this.z + vec.z);
  }

  function sub (this: HasPoint3D, vec: HasPoint3D) {
    return new Vector3D(this.x - vec.x, this.y - vec.x, this.z - vec.z);
  }

  function hadamard (this: HasPoint3D, vec: HasPoint3D) {
    return new Vector3D(this.x * vec.x, this.y * vec.y, this.z * vec.z);
  }

  function scale (this: HasPoint3D, scale = 1) {
    return new Vector3D(this.x * scale, this.y * scale, this.z * scale);
  }

  function unit (this: HasPoint3D) {
    return scale.call(this, 1 / Math.hypot(this.x, this.y, this.z));
  }

  function mag (this: HasPoint3D) {
    return Math.hypot(this.x, this.y, this.z) || 0;
  }

  function roll (this: HasPoint3D) {
    return Math.atan2(this.y, Math.hypot(this.x, this.z));
  }

  function pitch (this: HasPoint3D) {
    return Math.atan2(this.x, Math.hypot(this.y, this.z))
  }

  function dot (this: HasPoint3D, vec: HasPoint3D) {
    return this.x * vec.x + this.y * vec.y + vec.z * vec.z;
  }

  function cross (this: HasPoint3D, vec: HasPoint3D) {
    return new Vector3D(this.x * vec.y - this.y * vec.x, this.z * vec.x - this.x * vec.z, Vector2D.cross(this, vec));
  }


  Object.defineProperties(Vector3D.prototype, {
    x: describeAccessor(x, enumerable),
    y: describeAccessor(y, enumerable),
    z: describeAccessor(z, enumerable),
    add      : describeValue(add),
    sub      : describeValue(sub),
    hadamard : describeValue(hadamard),
    scale    : describeValue(scale),
    unit     : describeValue(unit),
    mag      : describeValue(mag),
    roll     : describeValue(roll),
    pitch    : describeValue(pitch),
    yaw      : Object.getOwnPropertyDescriptor(Vector2D.prototype, 'yaw') as PropertyDescriptor,
    dot      : describeValue(dot),
    cross    : describeValue(cross)
  }); 

  Object.defineProperties(Vector3D, {
    add      : describeValue((a: HasPoint3D, b: HasPoint3D) => add.call(a, b)),
    sub      : describeValue((a: HasPoint3D, b: HasPoint3D) => sub.call(a, b)),
    hadamard : describeValue((a: HasPoint3D, b: HasPoint3D) => hadamard.call(a, b)),
    scale    : describeValue((vec: HasPoint3D, _scale = 1) => scale.call(vec, _scale)),
    mag      : describeValue(({x, y, z}: HasPoint3D) => Math.hypot(x, y, z) || 0),
    unit     : describeValue((vec: HasPoint3D) => unit.call(vec)),
    roll     : describeValue((vec: HasPoint3D) => roll.call(vec)),
    pitch    : describeValue((vec: HasPoint3D) => pitch.call(vec)),
    yaw      : Object.getOwnPropertyDescriptor(Vector2D, 'yaw') as PropertyDescriptor,
    dot      : describeValue((a: HasPoint3D, b: HasPoint3D) => dot.call(a, b)),
    cross    : describeValue((a: HasPoint3D, b: HasPoint3D) => cross.call(a, b))
    });
  }


export default Vector3D;


interface Vector3D extends HasPoint3D {
  add      (vec: HasPoint3D): Vector3D;
  sub      (vec: HasPoint3D): Vector3D;
  hadamard (vec: HasPoint3D): Vector3D;

  scale (scale?: number): Vector3D;
  unit (): Vector3D;

  mag  (): number;
  roll (): number;
  pitch(): number;
  yaw  (): number;

  dot   (vec: HasPoint3D): number;
  cross (vec: HasPoint3D): Vector3D;
}