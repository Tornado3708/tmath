declare module 'tmath' {
// region primitive types start

type HasX = { x: number; };
type HasY = { y: number; };
type HasZ = { z: number; };

type HasYaw   = { yaw:   number; };
type HasRoll  = { roll:  number; };
type HasPitch = { pitch: number; };

type HasRadius = { radius: number; };

type HasWidth  = { width:  number; };
type HasHeight = { height: number; };
type HasDepth  = { depth:  number; };

type HasValues = { values: number[]; };

// region primitive types end



// region composed types start

type Vector2D = HasX & HasY;
type Vector3D = Vector2D & HasZ;
type Dimension = HasWidth & HasHeight;

type Rectangle = Vector2D & Dimension;
type Cube = Vector3D & Dimension & HasDepth;
type Circle = Vector2D & HasRadius;
type Sphere = Vector3D & HasRadius;

type Matrix = Dimension & HasValues;

// region composed types end






// region constructor types start
type Vector2DParameters = [vec: Vector3D] | [x: number, y: number] | [];
type Vector2DConstructor = {
  (...args: Vector2DParameters): Vector2D;
  
  add (a: Vector2D, b: Vector2D): Vector2D;
  sub (a: Vector2D, b: Vector2D): Vector2D;
  hadamard (a: Vector2D, b: Vector2D): Vector2D;
  
  unit (vec: Vector2D): Vector2D;
  mag (vec: Vector2D): number;
  yaw (vec: Vector2D): number;
  
  dot (a: Vector2D, b: Vector2D): number;
  cross (a: Vector2D, b: Vector2D): number;
  }
  
  
  
  type Vector3DParameters = [vec: Vector3D] | [x: number, y: number, z: number] | [];
  type Vector3DConstructor = {
    (...args: Vector3DParameters): Vector3D;

    add (a: Vector3D, b: Vector3D): Vector3D;
    sub (a: Vector3D, b: Vector3D): Vector3D;
    hadamard (a: Vector3D, b: Vector3D): Vector3D;
    
    unit (vec: Vector3D): Vector3D;
    mag (vec: Vector3D): number;
    yaw (vec: Vector3D): number;
    pitch (vec: Vector3D): number;
    roll (vec: Vector3D): number;
    
    dot (a: Vector3D, b: Vector3D): number;
    cross (a: Vector3D, b: Vector3D): Vector3D;
    };

    
    
type DimensionConstructor = {
  (width: number, height: number): Dimension;
}

type RectangleParameters = [width: number, height: number] | [x: number, y: number, width: number, height: number] | [rectangle: Rectangle] | [dimension: Dimension] | [pos: Vector2D, dimension: Dimension];
type RectangleConstructor = {
  (...args: RectangleParameters): Rectangle;

  center: {
    (rectangle: Rectangle): Vector2D;
    x (rectangle: HasX & HasWidth): number;
    y (rectangle: HasY & HasHeight): number;
  };
    
  opposite: {
    (rectangle: Rectangle): Vector2D;
    x (rectangle: HasX & HasWidth): number;
    y (rectangle: HasY & HasHeight): number;
  };

  area (rectangle: Rectangle): number;
  diagonal (rectangle: Rectangle): number;
}

type CircleParameters = [radius: number] | [radius: number, x: number, y: number] | [radius: HasRadius] | [circle: Circle];
type CircleConstructor = {
  (...args: CircleParameters): Circle;

  diameter (circle: HasRadius): number;
  circumstance (circle: HasRadius): number;
};


/**
 * See {@link ./../dev.md#matrix}
 */
type MatrixConstructor = {
  (width: number, height: number, values: number[]): Matrix;
  
  at (x: number, y: number, matrix: HasWidth & HasValues): number;
  transpose (matrix: Matrix): Matrix;
  submatrix (x: number, y: number, matrix: Matrix): Matrix;
  
  isScalar (matrix: Dimension): boolean;
  isVector (matrix: Dimension): boolean;
  isSquare (matrix: Dimension): boolean;
  
  add (a: Matrix, b: number): Matrix;
  add (a: Matrix, b: Matrix): Matrix;
  sub (a: Matrix, b: number): Matrix;
  sub (a: Matrix, b: Matrix): Matrix;
  mul (a: Matrix, b: number): Matrix;
  mul (a: Matrix, b: Matrix): Matrix;
  div (a: Matrix, b: number): Matrix;
  div (a: Matrix, b: Matrix): Matrix;
  
  hadamard (a: Matrix, b: Matrix): Matrix;
  
  det (matrix: Matrix): number;
  minor (x: number, y: number, matrix: Matrix): number;
  trace (matrix: Matrix): number;
  
  row: {
    switch (rows: [number, number], matrix: Matrix): Matrix;
    mul (row: number, k: number, matrix: Matrix): Matrix;
    add (firstRow: number, secondRow: number, k: number, matrix: Matrix): Matrix;
  };
}
    
    // region constructor types end
    

    
    // region constants start
    
    export const Vector2D: Vector2DConstructor;
    export const Vector3D: Vector3DConstructor;
    export const Dimension: DimensionConstructor;
    export const Rectangle: RectangleConstructor;
    export const Circle: CircleConstructor;
    
    export const Matrix: MatrixConstructor;
    
    // region constants end



    // region functions start
    export const lerp: (from: number, to: number, t: number) => number;
    // region function end
}