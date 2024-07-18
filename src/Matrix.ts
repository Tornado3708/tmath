import { HasValues } from "tmath";
import Dimension from "./Dimension.js";
import buffer from "./buffer.js";

const wrongSizeDefinition = () => {throw Error('Wrong size definition.')};



type MatrixParameters = [width: number, height: number, values: number[]] | [dimension: Dimension, values: number[]];
export default class Matrix implements Dimension, HasValues {

  static add      :ReturnType<typeof abstractAddition>;
  static sub      :ReturnType<typeof abstractAddition>;
  static hadamard :ReturnType<typeof abstractAddition>;
  static mul      :ReturnType<typeof abstractMultiplication>;
  static div      :ReturnType<typeof abstractMultiplication>;

  static {
    const mul = (a: number, b: number) => a * b;
    const div = (a: number, b: number) => 1 / b * a;

    this.add      = abstractAddition((a: number, b: number) => a + b);
    this.sub      = abstractAddition((a: number, b: number) => a - b);
    this.mul      = abstractMultiplication(mul);
    this.div      = abstractMultiplication(div);
    this.hadamard = abstractAddition(mul);
  }


  static trace = trace;
  static det   = det;
  static minor = minor;


  static at = at;
  static submatrix = submatrix;
  static transpose = transpose;

  static isScalar = isScalar;
  static isVector = isVector;
  static isSquare = isSquare;

  static row = {
    add: rowAdd,
    mul: rowMul,
    switch: rowSwitch
  };

  width!  :number;
  height! :number;
  values! :number[];

  constructor (...args: MatrixParameters) {
    buffer.create(this, 'width', `height`, 'values');

    switch (args.length) {
      case 2: args[0].width * args[0].height === args[1].length
        ? [this.width, this.height, this.values] = [args[0].width, args[0].height, args[1]]
        : wrongSizeDefinition();
        break;
      case 3:
        case 2: (args[0] as number) * (args[1] as number) === (args[2] as number[]).length
        ? [this.width, this.height, this.values] = [args[0] as number, args[1] as number, args[2] as number[]]
        : wrongSizeDefinition();
        break;
      default: throw Error(`Wrong costructor parameters:[${(args as any[]).map((value: any) => typeof value)} instead of [number, number, number[]] | [{width, height}, number[]]`);
    };
    ((plug = {set(){}}) => Object.defineProperties (this, { width: plug, height: plug, values: plug }))();
  }
}


  // extract block
function at (x: number, y: number, {width, height, values}: Matrix) {
  return (x < width && y < height) ? values[x + y * width] : 0;
}



function submatrix (x: number, y: number, matrix: Matrix) {
  const values: number[] = [];

  for (let i = 0; i < matrix.height; i++) if (i !== y) 
    for (let j = 0; j < matrix.width;  j++) if (j !== x) 
      values.push(at(i, j, matrix));

  return new Matrix (matrix.width - 1, matrix.height - 1, values);
};



function transpose (matrix: Matrix) {
  if (isVector(matrix)) return new Matrix(matrix.height, matrix.width, matrix.values);
  
  const values: number[] = [];

  for (let i = 0; i < matrix.height; i++)
    for (let j = 0; j < matrix.width; j++)
      values.push(at(j, i, matrix));

  return new Matrix(matrix.height, matrix.width, values);
}

function rowSwitch (rows: [number, number], {width, height, values}: Matrix) {
  if (rows[0] >= height || rows[1] >= height) throw Error(`Row "${Math.max(...rows)}" doesn't exist.`);

  const lines: number[][] = [];
  for (let i = 0; i < height; i++) {
    values.slice(i * width, i * width + width);
  }
  [lines[rows[0]], lines[rows[1]]] = [lines[rows[1]], lines[rows[0]]];

  return new Matrix(width, height, lines.reduce((a, b) => {a.push(...b); return a}, []));
}



function rowMul (row: number, k: number, matrix: Matrix) {
  if (!+k) throw Error('Can\'t multiply by 0.');

  const values: number[] = matrix.values;
  const first = row * matrix.width;

  for (let i = 0; i < matrix.width; i++)
    values[i + first] *= k;

  return new Matrix(matrix.width, matrix.height, values);
}



function rowAdd (rows: [number, number], k: number, matrix: Matrix) {
  if (rows[0] === rows[1]) throw Error('Can\'t multiply row by intself');

  matrix = rowMul(rows[1], k, matrix);

  const values = matrix.values;
  const start = rows.map(row => row * matrix.width);

  for (let i = 0; i < matrix.width; i++)
    values[start[0] + i] += values[start[1] + i];

  return new Matrix(matrix.width, matrix.height, values);
}




function trace (matrix: Matrix) {
  if (!isSquare(matrix)) throw Error ('Matrix is not square');

  let sum = 0;

  for (let i = 0; i < matrix.width; i++) 
    sum += at(i, i, matrix);

  return sum;
}

function det (matrix: Matrix) {
  if (!isSquare(matrix)) throw Error("Matrix is not square");

  const { values, width } = matrix;

  switch (width) {
    case 0: return 0;
    case 1: return values[0];
    case 2: return values[0] * values[3] - values[1] * values[2];
  }
  
  let sum = 0;

  for (let i = 0; i < width; i++) 
    sum += values[i] * det(submatrix(i, 0, matrix)) * (i % 2 ? -1 : 1);  

  return sum;
}


function minor (x: number, y: number, matrix: Matrix) {
  return det(submatrix(x, y, matrix));
};


function isScalar ({width, height}: Dimension) { return width === 1 && height === 1; };
function isVector ({width, height}: Dimension) { return width === 1 || height === 1; };
function isSquare ({width, height}: Dimension) { return width === height; };

function abstractAddition (callback: (a: number, b: number) => number) {
  return function (a: Matrix, b: Matrix | number) {

    if (typeof b === 'number') return new Matrix(a.width, a.height, a.values.map((value: number) => callback(value, b)));

    if (a.width !== b.width || a.height !== b.height) throw Error('Size of matrices is not same.');

    const values: number[] = [];

    for (let i = 0; i < a.height; i++) {
      for (let j = 0; j < a.width; j++) {
        values.push(callback(at(j, i, a), at(j ,i, b)));
      }
    }
    return new Matrix(a.width, a.height, values);
  }
}

function abstractMultiplication (callback: (a: number, b: number) => number) {
  return function (a: Matrix, b: Matrix | number) {
    if (typeof b === 'number') return new Matrix(a.width, a.height, a.values.map((value: number) => callback(value, b)));
    
    if (a.width !== b.height)
      throw Error('Width of matrix [a] should be equals to height of matrix [b].');

    const values: number[] = [];

    for (let i = 0; i < a.height; i++) {
      for (let j = 0; j < b.width; j++) {
        for (let k = 0; k < a.width; k++) {
          values.push(callback(at(k, i, a), at(j, k, b)));
        }
      }
    }

    return new Matrix(b.width, a.height, values);
  }
}



Object.freeze(Matrix);



