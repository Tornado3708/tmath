"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Matrix = exports.Dimension = exports.Rectangle = exports.Circle = exports.Line2D = exports.Vector3D = exports.Vector2D = void 0;
const Vector2D_js_1 = __importDefault(require("./Vector2D.js"));
const Vector3D_js_1 = __importDefault(require("./Vector3D.js"));
const Line2D_js_1 = __importDefault(require("./Line2D.js"));
const Circle_js_1 = __importDefault(require("./Circle.js"));
const Rectangle_js_1 = __importDefault(require("./Rectangle.js"));
const Dimension_js_1 = __importDefault(require("./Dimension.js"));
const Matrix_js_1 = __importDefault(require("./Matrix.js"));
exports.Vector2D = Vector2D_js_1.default;
exports.Vector3D = Vector3D_js_1.default;
exports.Line2D = Line2D_js_1.default;
exports.Circle = Circle_js_1.default;
exports.Rectangle = Rectangle_js_1.default;
exports.Dimension = Dimension_js_1.default;
exports.Matrix = Matrix_js_1.default;
exports.default = {
    Vector2D: exports.Vector2D,
    Vector3D: exports.Vector3D,
    Circle: exports.Circle,
    Rectangle: exports.Rectangle,
    Dimension: exports.Dimension,
    Matrix: exports.Matrix,
};
//# sourceMappingURL=index.js.map