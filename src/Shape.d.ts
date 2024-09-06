interface Shape {
  contains (x: number, y: number): boolean;
  contains (x: number, y: number, width: number, height: number): boolean;
  contains (pos: Point2D): boolean;
  contains (rect: Rectangle): boolean;

  getBounds (): Rectangle;

  transform (matrix: [number, number, number, number, number, number]): PathIterator;

  intersects (x: number, y: number, width: number, height: number): boolean;
  intersects (rect: Rectangle): boolean;
}

interface Point2D {
  x: number;
  y: number;
}

interface Point3D extends Point2D {
  z: number;
}

interface Rectangle extends Point2D {
  width: number;
  height: number;
}

type PathIterator = Generator<Point2D>;
