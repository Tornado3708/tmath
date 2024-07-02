import buffer from "./buffer.js";
import Vector2D from "./Vector2D.js";



type CircleParameters = [hasRadius: HasRadius] | [circle: Circle] | [radius: number]  | [position: Vector2D, hasRadius: HasRadius] | [x: number, y: number, radius: number] | [];



export default class Circle {

  x      !:number;
  y      !:number;
  radius !:number;

  constructor (...args: CircleParameters) {
    buffer.create(this, 'x', 'y', 'radius');

    switch (args.length) {
      case 0: return this;
      case 1:
        if (args[0] && typeof args[0] === 'object' && 'radius' in args[0]) {
          this.radius = args[0].radius;

          if ('x' in args[0] && 'y' in args[0])
            [this.x, this.y] = Vector2D.toArray(args[0]);
        
        } else this.radius = args[0];
      case 2:
        [this.x, this.y] = Vector2D.toArray(args[0] as Vector2D);
        this.radius = (args[1] as HasRadius).radius;
      default: [this.x, this.y, this.radius] = args as [number, number, number];
    }
  }
}

function diameter ({ radius }: HasRadius) {
  return radius * 2;
}

function circumstance (circle: HasRadius) {
  return diameter(circle) * Math.PI;
}

function area ({ radius }: HasRadius) {
  return radius ** 2 * Math.PI;
}



Object.freeze(Circle);