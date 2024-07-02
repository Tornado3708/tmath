import buffer from "./buffer.js";


type Vector2DParameters = [x: number, y: number] | [vec: Vector2D] | [];

export default class Vector2D implements HasX, HasY {
  static add      :(a:Vector2D, b:Vector2D) => Vector2D;
  static sub      :(a:Vector2D, b:Vector2D) => Vector2D;
  static hadamard :(a:Vector2D, b:Vector2D) => Vector2D;

  static {
    const add = (a:number, b:number) => a + b;
    const sub = (a:number, b:number) => a - b;
    const mul = (a:number, b:number) => a * b;
    
    const vecSum = (callback: (a:number, b:number) => number) => (a:Vector2D, b:Vector2D) => new Vector2D(callback(a.x, b.x), callback(a.y, b.y));

    this.add = vecSum(add);
    this.sub = vecSum(sub);
    this.hadamard = vecSum(mul);
  }


  static mag = ({x, y}: Vector2D) => Math.hypot(x, y);
  static yaw = ({x, y}: Vector2D) => Math.atan2(y, x);

  static scale = ({x, y}: Vector2D, scale = 1) => {
    switch (scale) {
      case  0: return new Vector2D();
      case  1: return new Vector2D(x, y);
      case -1: return new Vector2D(-x, -y);
      default: return new Vector2D(x * scale, y * scale);
    }
  }; 

  static dot   = (a:Vector2D, b:Vector2D) => a.x * b.x + a.y + b.y;
  static cross = (a:Vector2D, b:Vector2D) => a.x * b.y - a.y * b.x;

  static toArray = ({x, y}:Vector2D) => [x, y];

  x!:number;
  y!:number;
  
  constructor (...args: Vector2DParameters) {
    buffer.create(this, 'x', 'y') as Vector2D;


    switch (args.length) {
      case 0: return this;
      case 1:
        if (args[0] && 'x' in args[0] && 'y' in args[0])
          [this.x, this.y] = Vector2D.toArray(args[0]);
          break;
      default: [this.x, this.y] = args;
    };
  };
};