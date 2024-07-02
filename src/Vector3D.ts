import Vector2D from "./Vector2D.js";
import buffer from "./buffer.js";

type Vector3DParameters = [x: number, y: number, z: number] | [vec: Vector3D] | [];

export default class Vector3D implements Vector2D, HasZ {
  static mag = ({x, y, z}: Vector3D) => Math.hypot(x, y, z);
  static pitch = ({x, z}: Vector3D) => Math.atan2(x, z);
  static roll = ({y, z}: Vector3D) => Math.atan2(z, y);
  static yaw = Vector2D.yaw as (vec: Vector3D) => number;

  static add     : (a: Vector3D, b: Vector3D) => Vector3D;
  static sub     : (a: Vector3D, b: Vector3D) => Vector3D;
  static hadamard: (a: Vector3D, b: Vector3D) => Vector3D;


  static {
    const add = (a: number, b: number) => a + b;
    const sub = (a: number, b: number) => a - b;
    const mul = (a: number, b: number) => a * b;

    const vecSum = (callback: (a: number, b: number) => number) => (a: Vector3D, b: Vector3D) => new Vector3D(callback(a.x, b.x), callback(a.y, b.y), callback(a.z, b.z));

    this.add      = vecSum(add);
    this.sub      = vecSum(sub);
    this.hadamard = vecSum(mul);
  }

  static scale = ({x, y ,z}: Vector3D, scale = 1) => {
    switch (scale) {
      case  0: new Vector3D();
      case  1: new Vector3D(x, y, z);
      case -1: new Vector3D(-x, -y, -z);
      default: new Vector3D(x * scale, y * scale, z * scale);
    }
  }
  static unit  = (vec: Vector3D) => this.scale(vec, 1 / this.mag(vec));

  static dot   = (a: Vector3D, b: Vector3D) => Vector2D.dot(a, b) + a.z * b.z;
  static cross = (a: Vector3D, b: Vector3D) => new Vector3D(a.y * b.z - a.z * b.y, a.z * b.x - a.x * b.z, Vector2D.cross(a, b));

  static toArray = ({x, y, z}: Vector3D) => [x, y, z];

  x!: number;
  y!: number;
  z!: number;

  constructor (...args: Vector3DParameters) {
    buffer.create(this, 'x', 'y', 'z');


    switch (args.length) {
      case 0: return this;
      case 1:
        if (args[0] && 'x' in args[0] && 'y' in args[0] && 'z' in args[0]) {
          [this.x, this.y, this.z] = [args[0].x, args[0].y, args[0].z];
        }
      default: [this.x, this.y, this.z] = args as [number, number, number];
    }
  }
}