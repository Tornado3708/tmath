import { HasX, HasY } from "tmath";

const 
  __x__ = new WeakMap() as WeakMap<Vector2D, number>,
  __y__ = new WeakMap() as WeakMap<Vector2D, number>;


class Vector2D {
  
  static add      = (a: Point2D, b: Point2D): Vector2D => new Vector2D(a.x + b.x, a.y + b.y);
  static sub      = (a: Point2D, b: Point2D): Vector2D => new Vector2D(a.x - b.x, a.y - b.y);
  static hadamard = (a: Point2D, b: Point2D): Vector2D => new Vector2D(a.x * b.x, a.y * b.y);

  static mag = ({x, y}: Point2D) => Math.hypot(x, y);
  static yaw = ({x, y}: Point2D) => Math.atan2(y, x);

  static scale = ({x, y}: Point2D, scale: number = 1) => {
    switch (true) {
      case !+scale      : return new Vector2D();
      case scale ===  1 : return new Vector2D(x, y);
      case scale === -1 : return new Vector2D(-x, -y);
      default           : return new Vector2D(x * scale, y * scale);
    }
  };

  static unit = (vec: Point2D) => this.scale(vec, 1 / this.mag(vec));

  static dot   = (a:Point2D, b:Point2D) => a.x * b.x + a.y * b.y;
  static cross = (a:Point2D, b:Point2D) => a.x * b.y - a.y * b.x;

  static toArray = ({x, y}: Point2D): [number, number] => [x, y];

  constructor();
  constructor(x: number, y: number);
  constructor(vec: Point2D);
  constructor (...args: any[]) {
    this.x = args[0]?.x || args[0];
    this.y = args[0]?.y || args[1];
  };
}

{
  const descriptor = (buffer: WeakMap<Vector2D, number>) => ({
    get (this: Vector2D)                { return buffer.get(this) || 0 },
    set (this: Vector2D, value: number) { buffer.set(this, +value || 0) }
  });

  Object.defineProperties(Vector2D.prototype, {
    x: descriptor(__x__),
    y: descriptor(__y__) 
});
}



Vector2D.prototype.add = function add(this: Vector2D, vec: Point2D) {
  return Vector2D.add(this, vec);
};

Vector2D.prototype.sub = function sub(this: Vector2D, vec: Point2D) {
  return Vector2D.sub(this, vec);
}

Vector2D.prototype.hadamard = function hadamard (this: Vector2D, vec: Point2D) {
  return Vector2D.hadamard(this, vec);
}

Vector2D.prototype.yaw = function yaw (this: Vector2D) {
  return Vector2D.yaw(this);
}

Vector2D.prototype.mag = function mag (this: Vector2D) {
  return Vector2D.mag(this);
}

Vector2D.prototype.scale = function scale(this: Vector2D, scale: number = 1) {
  return Vector2D.scale(this, scale);
}

Vector2D.prototype.unit = function scale (this: Vector2D) {
  return Vector2D.unit(this);
}

Vector2D.prototype.dot = function dot (this: Vector2D, vec: Point2D) {
  return Vector2D.dot(this, vec);
}

Vector2D.prototype.cross = function cross (this: Vector2D, vec: Point2D) {
  return Vector2D.cross(this, vec);
}

Vector2D.prototype.toArray = function toArray (this: Vector2D) {
  return Vector2D.toArray(this);
}


export default Vector2D;


interface Vector2D extends Point2D {

  add (vec: Point2D)     : Vector2D;
  sub (vec: Point2D)     : Vector2D;
  hadamard (vec: Point2D): Vector2D;

  yaw (): number;
  mag (): number;

  scale (scale: number): Vector2D;
  unit (): Vector2D;

  dot   (vec: Point2D): number;
  cross (vec: Point2D): number;

  toArray (): [number, number];

  prototype: Vector2D;
}


type Point2D = {
  x: number;
  y: number;
}


declare module 'tmath' {
  export const Vector2D: Vector2D;
}