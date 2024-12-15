import { width, height, values } from "./buffers";
import { HasWidth, HasHeight, HasDimension } from "./types";



type Error = 'size_def_prod' | 'size_def_fraq' | 'out_of_bounds_x' | 'out_of_bounds_y' | 'non_int_x' | 'non_int_y';

const err = (reason: Error) => { throw new EvalError(
  new Map<Error, string>()
    .set('size_def_prod', '[values] length not equals to [width] & [height] product')
    .set('size_def_fraq', 'fraction of [values] length and [width] is not integer')
    .set('non_int_x', '[x] is not integer')
    .set('non_int_y', '[y] is not integer')
    .get(reason) || 'unknown error'
)};


class Matrix {
  constructor (...args: any[]) {
    switch (args.length) {
      case 0:
        values.set(this, new Float64Array(0));
        width .set(this, 0);
        height.set(this, 0);
        break;
      case 1:
        throw new Error('Matrix size is not defined, width or width and height should be defined');
      case 2:
        if (!Number.isInteger(args[0].length / args[1]) || !Number.isInteger(args[1])) {
          throw new Error('Wrong size definition');
        }
        values.set(this, new Float64Array(args[0]));
        width .set(this, args[1]);
        height.set(this, args[0].length / args[1]);
        break;
      default:
        if (Number.isInteger(args[1]) && Number.isInteger(args[2]) && args[0].length === args[1] * args[2]) {
          values.set(this, new Float64Array(args[0]));
          width .set(this, args[1]);
          height.set(this, args[2]);
        } 
    }
  }
}


{
  const 
    defaultDescriptor: PropertyDescriptor = { configurable: !1, enumerable: !1 },
    enumerable: PropertyDescriptor = {configurable: !1, enumerable: !0 },
    describeValue = <T>(value: T, descriptor = defaultDescriptor) => Object.assign({ value }, descriptor),
    describeAccessor = <T>(buffer: WeakMap<Matrix, T>, descriptor = defaultDescriptor) => Object.assign({
      get (this: Matrix) { return buffer.get(this) }
    }, descriptor);

  

  function at (this: HasMatrix, x: number, y: number) {
    if (Number.isInteger(x) && Number.isInteger(y) && x > -1 && x < this.width && y > -1 && y < this.height) {
      return this.values[x + y * this.width];
    }
  }

  function isEmpty  (this: HasMatrix) { return this.width === 0 || this.height === 0 }
  function isScalar (this: HasMatrix) { return this.width === 1 && this.height === 1 }
  function isVector (this: HasMatrix) { return this.width === 1 || this.height === 1 }
  function isSquare (this: HasMatrix) { return this.width === this.height }

  function createMatrixAddition (name: string, callback: (a: number, b: number) => number) {
    return Object.defineProperty(function (this: HasMatrix, {width, height, values}: HasMatrix) {
      if (this.width !== width || this.height !== height) { throw Error('Size is not same.') }

      return new Matrix(this.width, this.height, this.values.map((value, index) => callback(value, values[index])));
    }, 'name', { value: name })
  }

  function transpose (this: HasMatrix) {
    const { width, height, values } = this;
    switch(true) {
      case (isEmpty.call(this)) :
        return new Matrix(0, 0, new Float64Array(0));
      case isVector.call(this)  :
        return new Matrix(height, width, values);
      case isSquare.call(this)  : {
        const _values = new Float64Array(values);

        for (let i = 0; i < width - 1; i++) {
          for (let j = i + 1; j < width; j++) {
            [_values[i + j * width], _values[j + i * width]] = [_values[j + i * width], _values[i + j * width]];
          }
        }

        return new Matrix(width, width, _values);
      }
      default:
        const _values = new Float64Array(values.length);

        for (let i = 0; i < height; i++) {
          for (let j = 0; j < width; j++) {
            _values[i + j * height] = _values[j + i * width];
          }
        }

        return new Matrix(height, width, _values);
    }
  }

  function createMatrixMultiplication (name: string, callback: (a: number, b: number) => number) {
    return Object.defineProperty(function (this: HasMatrix, m: HasMatrix | number) {

      if (typeof m === 'number') {
        return new Matrix(this.width, this.height, this.values.map(value => callback(value, m)));
      }

      if (this.width !== m.height) { throw Error('Size is not for multiplication.') }

      const 
        [size, width, height, values, m_values] = [this.width, m.width, this.height, this.values, m.values],
        result = new Float64Array(height * width);

      for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
          let sum = 0;
          
          for (let k = 0; k < size; k++) {
            sum += callback(values[i * size + k], m_values[k * width + j]);
          }

          result[i * width + j] = sum;
         }
      }

      return new Matrix(height, width, result);
    }, 'name', { value: name })
  }

  function trace (this: HasMatrix) {
    if (!isSquare.call(this)) { throw Error('Matrix is not square.') }
    
    const { width, values } = this;
    let result = values[0];

    for (let i = 0; i < width; i++) {
      result += values[i + i * width];
    }

    return result;
  }


  function det (this: HasMatrix) {
    if (!isSquare.call(this)) { throw Error('Matrix is not square.') }
    
    const { width, values: v } = this;

    switch (width) {
      case 0  : return 0;
      case 1  : return v[0];
      case 2  : return v[0] * v[3] - v[1] * v[2];
      default :
        let sum = 0, prod = 1;

        for (let i = 0; i < width; i++) {
          prod = 1;
          
          for (let j = 0; j < width; j++) {
            prod *= v[(j + i) % width + i * width % v.length];
          }

          sum += prod;
        }

        return sum;
    }
  }

  function submatrix (this: HasMatrix, x: number, y: number) {
    if (!isSquare.call(this)) { err('non_square' as Parameters<typeof err>[0]) }
    if (x < 0 || x >= this.width || !Number.isInteger(x) || y < 0 || y >= this.height || !Number.isInteger(y)) throw Error ('Position is wrong.');

    const { width, height, values } = this, sub = [] as Array<number>;

    x = Math.min(x, width)  || 0;
    y = Math.min(y, height) || 0;

    for (let i = 0; i < y; i++) {
      for (let j = 0; j < x; j++) {
        sub.push(values[j + i * width]);
      }
      for (let j = x + 1; j < width; j++) {
        sub.push(values[j + i * width]);
      }
    }

    for (let i = y + 1; i < height; i++) {
      for (let j = 0; j < x; j++) {
        sub.push(values[j + i * width]);
      }
      for (let j = x + 1; j < width; j++) {
        sub.push(values[j + i * width]);
      }
    }

    return new Matrix(width - 1, height - 1, sub);
  }


  function minor <X extends number, Y extends number>(this: HasMatrix, x: Integer<X>, y: Integer<Y>) {
    return submatrix.call(this, x, y).det();
  }

  Object.defineProperties(Matrix.prototype, {
    width  : describeAccessor(width, enumerable),
    height : describeAccessor(height, enumerable),
    values : {get: function (this: Matrix) { return new Float64Array(values.get(this) as Float64Array) } , ...enumerable},

    at        : describeValue(at),
    transpose : describeValue(transpose),
    submatrix : describeValue(submatrix),

    isEmpty: describeValue(isEmpty),
    isScalar: describeValue(isScalar),
    isVector: describeValue(isVector),
    isSquare: describeValue(isSquare),

    add: describeValue(createMatrixAddition('add', (a, b) => a + b)),
    sub: describeValue(createMatrixAddition('sub', (a, b) => a - b)),
    hadamard: describeValue(createMatrixAddition('hadamard', (a, b) => a * b)),

    mul: (describeValue(createMatrixMultiplication('mul', (a, b) => a * b))),
    div: (describeValue(createMatrixMultiplication('div', (a, b) => 1 / b * a))),

    trace: describeValue(trace),
    det: describeValue(det),
    minor: describeValue(minor)
  });

}

export default Matrix;

interface Matrix extends HasMatrix{

  new (values: ArrayLike<number>, width: number): Matrix;
  new (values: ArrayLike<number>, width: number, height: number): Matrix;


  at <X extends number, Y extends number>(x: Integer<X>, y: Integer<Y>): number;

  isEmpty  (): boolean;
  isScalar (): boolean;
  isVector (): boolean;
  isSquare (): boolean;

  add (m: HasMatrix): Matrix;
  sub (m: HasMatrix): Matrix;
  hadamard (m: HasMatrix): Matrix;
  mul (value: number | Matrix): Matrix;
  div (value: number | Matrix): Matrix;

  trace (): number;
  det (): number;
  minor(): number;

  transpose(): Matrix;
  submatrix<X extends number, Y extends number>(x: Integer<X>, y: Integer<Y>): Matrix;

  // row operations
}

type Integer <T extends number> = `${T}` extends `${bigint}` ? T : never;
type HasMatrix = Readonly<HasDimension & { values: Float64Array }>;