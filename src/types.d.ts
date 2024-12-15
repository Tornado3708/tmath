import Rectangle from "./Rectangle.js";

export type HasX      = { x: number };
export type HasY      = { y: number };
export type HasZ      = { z: number };
export type HasWidth  = { width: number };
export type HasHeight = { height: number };
export type HasRadius = { radius: number };

export type HasPoint2D   = HasX & HasY;
export type HasPoint3D   = HasPoint2D & HasZ;
export type HasDimension = HasWidth & HasHeight;
export type HasCircle    = HasPoint2D & HasRadius;
export type HasRectangle = HasPoint2D & HasDimension;

export interface Shape {
  getBounds (): Rectangle;
  contains(...args: [x: number, y: number] | [x: number, y: number, width: number, height: number] | [point: HasPoint2D] | [rect: HasRectangle]): boolean;
  intersects(...args: [x: number, y: number, width: number, height: number] | [rect: HasRectangle]): boolean;
}

// export interface Cloneable {
//   clone (): this;
// }