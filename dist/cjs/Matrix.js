"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const buffer_js_1 = __importDefault(require("./buffer.js"));
/**
 * Creates instance of Matrix.
 * {@link ./../dev.md dev}.
 * @param {number}width
 * @param {number} height
 * @param {number[]} values
 * @returns {Matrix}
*/
const _matrix = (width, height, values) => {
    if (width * height !== values.length)
        throw Error('Wrong size of matrix.');
    const matrix = buffer_js_1.default.create('width', 'height', 'values');
    matrix.width = width;
    matrix.height = height;
    matrix.values = values;
    return matrix;
};
// extract block
{
    const at = (x, y, { width, values }) => values[x + y * width] || 0;
    const submatrix = (x, y, matrix) => {
        if (!matrix.values.length)
            return _matrix(0, 0, []);
        const values = [];
        for (let i = 0; i < matrix.height; i++) {
            if (i === y)
                continue;
            for (let j = 0; j < matrix.width; j++) {
                if (j !== x)
                    values.push(_matrix.at(j, i, matrix));
            }
        }
        return _matrix(--matrix.width, --matrix.height, values);
    };
    _matrix.at = at;
    _matrix.submatrix = submatrix;
    _matrix.transpose = transpose;
}
// row operations block
{
    const _switch = (rows, { width, height, values }) => {
        if (rows.filter(index => index >= height).length)
            throw Error('Row is too high');
        const newValues = values;
        const first = rows.map((row) => row * width);
        for (let i = 0; i < width; i++) {
            [values[first[0] + i], values[first[1] + i]] = [values[first[1] + i], values[first[0] + i]];
        }
        return _matrix(width, height, newValues);
    };
    const mul = (row, k, { width, height, values }) => {
        if (!k)
            throw Error("Can't multiply by 0.");
        const newValues = values;
        const first = row * width;
        for (let i = 0; i < width; i++) {
            newValues[i + first] = newValues[i + first] * k;
        }
        return _matrix(width, height, newValues);
    };
    const add = (firstRow, secondRow, k, matrix) => {
        if (firstRow === secondRow)
            throw Error('Can\'t multiply row by itself');
        matrix = mul(secondRow, k, matrix);
        const newValues = matrix.values;
        const first = matrix.width * firstRow;
        const second = matrix.width * secondRow;
        for (let i = 0; i < matrix.width; i++) {
            newValues[first + i] += newValues[second + i];
        }
        return _matrix(matrix.width, matrix.height, newValues);
    };
    _matrix.row = { switch: _switch, mul, add };
}
_matrix.isScalar = ({ width, height }) => (width === 1 && height === 1);
_matrix.isVector = isVector;
_matrix.isSquare = isSquare;
// calculations block
{
    const add = (a, b) => a + b;
    const sub = (a, b) => a - b;
    const mul = (a, b) => a * b;
    const div = (a, b) => 1 / b * a;
    _matrix.add = abstractAddition(add);
    _matrix.sub = abstractAddition(sub);
    _matrix.mul = abstractMultiplication(mul);
    _matrix.div = abstractMultiplication(div);
    _matrix.hadamard = abstractAddition(mul);
}
_matrix.trace = trace;
function trace(matrix) {
    if (!isSquare(matrix))
        throw Error('Matrix is not square');
    let sum = 0;
    for (let i = 0; i < matrix.width; i++) {
        sum += _matrix.at(i, i, matrix);
    }
    return sum;
}
/**
 * TODO
 * @param matrix
 * @returns
 */
_matrix.det = (matrix) => 0;
/**
 * TODO
 * @param matrix
 * @param x
 * @param y
 * @returns
 */
_matrix.minor = (x, y, matrix) => 0;
function transpose({ width, height, values }) {
    if (isVector({ width, height }))
        return _matrix(height, width, values);
    const newValues = [];
    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
            newValues.push(values[i + j * width]);
        }
    }
    return _matrix(height, width, newValues);
}
function isScalar({ width, height }) { return width === 1 && height === 1; }
;
function isVector({ width, height }) { return width === 1 || height === 1; }
;
function isSquare({ width, height }) { return width === height; }
;
function abstractAddition(callback) {
    return function (a, b) {
        if (typeof b === 'number')
            return _matrix(a.width, a.height, a.values.map((value) => callback(value, b)));
        if (a.width !== b.width || a.height !== b.height)
            throw Error('Size of matrices is not same.');
        const values = [];
        for (let i = 0; i < a.height; i++) {
            for (let j = 0; j < a.width; j++) {
                values.push(callback(_matrix.at(j, i, a), _matrix.at(j, i, b)));
            }
        }
        return _matrix(a.width, a.height, values);
    };
}
function abstractMultiplication(callback) {
    return function (a, b) {
        if (typeof b === 'number')
            return _matrix(a.width, a.height, a.values.map((value) => callback(value, b)));
        if (a.width !== b.height)
            throw Error('Width of matrix [a] should be equals to height of matrix [b].');
        const values = [];
        for (let i = 0; i < a.height; i++) {
            for (let j = 0; j < b.width; j++) {
                for (let k = 0; k < a.width; k++) {
                    values.push(callback(_matrix.at(k, i, a), _matrix.at(j, k, b)));
                }
            }
        }
        return _matrix(b.width, a.height, values);
    };
}
exports.default = Object.freeze(_matrix);
