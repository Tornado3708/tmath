import { HasDimension } from "./types";
declare class Matrix {
    constructor(...args: any[]);
}
export default Matrix;
interface Matrix extends HasMatrix {
    new (values: ArrayLike<number>, width: number): Matrix;
    new (values: ArrayLike<number>, width: number, height: number): Matrix;
    at<X extends number, Y extends number>(x: Integer<X>, y: Integer<Y>): number;
    isEmpty(): boolean;
    isScalar(): boolean;
    isVector(): boolean;
    isSquare(): boolean;
    add(m: HasMatrix): Matrix;
    sub(m: HasMatrix): Matrix;
    hadamard(m: HasMatrix): Matrix;
    mul(value: number | Matrix): Matrix;
    div(value: number | Matrix): Matrix;
    trace(): number;
    det(): number;
    minor(): number;
    transpose(): Matrix;
    submatrix<X extends number, Y extends number>(x: Integer<X>, y: Integer<Y>): Matrix;
}
type Integer<T extends number> = `${T}` extends `${bigint}` ? T : never;
type HasMatrix = Readonly<HasDimension & {
    values: Float64Array;
}>;
//# sourceMappingURL=Matrix.d.ts.map