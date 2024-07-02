import Vector2D from "./Vector2D.js";


type Line2DParameters = [line: Line2D] | [a: Vector2D, b: Vector2D] | [x1: number, y1: number, x2: number, y2: number] | [];


function createDescriptor () {
  const vectors = [0, 0].map(() => new Vector2D());
  return {
    ['x1']: { set (x1: number) { vectors[0].x = x1 }, get () { return vectors[0].x } },
    ['x2']: { set (x2: number) { vectors[1].x = x2 }, get () { return vectors[1].x } },
    ['y1']: { set (y1: number) { vectors[0].y = y1 }, get () { return vectors[0].y } },
    ['y2']: { set (y2: number) { vectors[1].y = y2 }, get () { return vectors[1].y } },
  };
}


export default class Line2D {
  x1!: number;
  x2!: number;
  y1!: number;
  y2!: number;

  constructor (...args: Line2DParameters) {

    Object.defineProperties(this, createDescriptor());

    switch (args.length) {
      case 0: return this;
      case 1: 
        this.x1 = args[0].x1;
        this.x2 = args[0].x2;
        this.y1 = args[0].y1;
        this.y2 = args[0].y2;
      case 2:
        [this.x1, this.y1] = Vector2D.toArray(args[0] as Vector2D);
        [this.x2, this.y2] = Vector2D.toArray(args[1] as Vector2D);
      default: [this.x1, this.y1, this.x2, this.y2] = args as [number, number, number, number];
    }
  }
}