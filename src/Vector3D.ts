import Vector2D from "./Vector2D.js";

const 
  __x__ = new WeakMap() as WeakMap<Vector3D, number>,
  __y__ = new WeakMap() as WeakMap<Vector3D, number>,
  __z__ = new WeakMap() as WeakMap<Vector3D, number>;



class Vector3D {
  static mag = ({x, y, z}: Point3D) => Math.hypot(x, y, z);
  static pitch = ({x, z}: Point3D) => Math.atan2(x, z);
  static roll = ({y, z}: Point3D) => Math.atan2(z, y);
  static yaw = Vector2D.yaw as (vec: Point3D) => number;

  
  static add      = (a: Point3D, b: Point3D) => new Vector3D(a.x + b.x, a.y + b.y, a.z + b.z);
  static sub      = (a: Point3D, b: Point3D) => new Vector3D(a.x - b.x, a.y - b.y, a.z - b.z);
  static hadamard = (a: Point3D, b: Point3D) => new Vector3D(a.x * b.x, a.y * b.y, a.z * b.z);


  static scale = ({x, y ,z}: Point3D, scale = 1) => {
    switch (scale) {
      case  0: return new Vector3D();
      case  1: return new Vector3D(x, y, z);
      case -1: return new Vector3D(-x, -y, -z);
      default: return new Vector3D(x * scale, y * scale, z * scale);
    }
  }
  static unit  = (vec: Point3D) => this.scale(vec, 1 / this.mag(vec));

  static dot   = (a: Point3D, b: Point3D) => Vector2D.dot(a, b) + a.z * b.z;
  static cross = (a: Point3D, b: Point3D) => new Vector3D(a.y * b.z - a.z * b.y, a.z * b.x - a.x * b.z, Vector2D.cross(a, b));

  static toArray = ({x, y, z}: Point3D) => [x, y, z];

  constructor ();
  constructor (x: number, y: number, z: number);
  constructor (vec: Point3D);
  constructor (...args: any[]) {
    this.x = args[0]?.x || args[0];
    this.y = args[0]?.y || args[1];
    this.z = args[0]?.z || args[2];
  }
}


{
  const descriptor = (buffer: WeakMap<Vector3D, number>) => ({
    set (this: Vector3D, value: number) { buffer.set(this, +value || 0) },
    get (this: Vector3D)                { return buffer.get(this) || 0 }
  });

  Object.defineProperties(Vector3D.prototype, {
    x: descriptor(__x__),
    y: descriptor(__y__),
    z: descriptor(__z__)
  });
}


Vector3D.prototype.add = function add (this: Vector3D, vec: Point3D) {
  return Vector3D.add(this, vec);
}

Vector3D.prototype.sub = function sub (this: Vector3D, vec: Point3D) {
  return Vector3D.sub(this, vec);
}

Vector3D.prototype.hadamard = function hadamard (this: Vector3D, vec: Point3D) {
  return Vector3D.hadamard(this, vec);
}


interface Vector3D extends Point3D {
  add      (vec: Point3D): Vector3D;
  sub      (vec: Point3D): Vector3D;
  hadamard (vec: Point3D): Vector3D;

  scale (): Vector3D;
  scale (scale: number): Vector3D;
  unit (): Vector3D;

  dot   (vec: Point3D): number;
  cross (vec: Point3D): Vector3D;

  toArray (vec: Point3D): [number, number, number];

  prototype: Vector3D;
}

export default Vector3D;

declare module 'tmath' {  export const Vector3D: Vector3D;  }