import Dimension from "./Dimension.js";
type MatrixParameters = [width: number, height: number, values: number[]] | [dimension: Dimension, values: number[]];
export default class Matrix implements Dimension, HasValues {
    static add: ReturnType<typeof abstractAddition>;
    static sub: ReturnType<typeof abstractAddition>;
    static hadamard: ReturnType<typeof abstractAddition>;
    static mul: ReturnType<typeof abstractMultiplication>;
    static div: ReturnType<typeof abstractMultiplication>;
    static trace: typeof trace;
    static det: typeof det;
    static minor: typeof minor;
    static at: typeof at;
    static submatrix: typeof submatrix;
    static transpose: typeof transpose;
    static isScalar: typeof isScalar;
    static isVector: typeof isVector;
    static isSquare: typeof isSquare;
    static row: {
        add: typeof rowAdd;
        mul: typeof rowMul;
        switch: typeof rowSwitch;
    };
    width: number;
    height: number;
    values: number[];
    constructor(...args: MatrixParameters);
}
declare function at(x: number, y: number, { width, height, values }: Matrix): number;
declare function submatrix(x: number, y: number, matrix: Matrix): Matrix;
declare function transpose(matrix: Matrix): Matrix;
declare function rowSwitch(rows: [number, number], { width, height, values }: Matrix): Matrix;
declare function rowMul(row: number, k: number, matrix: Matrix): Matrix;
declare function rowAdd(rows: [number, number], k: number, matrix: Matrix): Matrix;
declare function trace(matrix: Matrix): number;
declare function det(matrix: Matrix): number;
declare function minor(x: number, y: number, matrix: Matrix): number;
declare function isScalar({ width, height }: Dimension): boolean;
declare function isVector({ width, height }: Dimension): boolean;
declare function isSquare({ width, height }: Dimension): boolean;
declare function abstractAddition(callback: (a: number, b: number) => number): (a: Matrix, b: Matrix | number) => Matrix;
declare function abstractMultiplication(callback: (a: number, b: number) => number): (a: Matrix, b: Matrix | number) => Matrix;
export {};
//# sourceMappingURL=Matrix.d.ts.map