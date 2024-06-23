"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const buffer_js_1 = __importDefault(require("./buffer.js"));
const _dimension = (...args) => {
    if (typeof args[0] === 'object') {
        return _dimension(...(Reflect.has(args[0], 'width') && Reflect.has(args[0], 'height'))
            ? [args[0].width, args[0].height]
            : [0, 0]);
    }
    else {
        const dimension = buffer_js_1.default.create('width', 'height');
        [dimension.width, dimension.height] = args;
        return dimension;
    }
};
exports.default = Object.freeze(_dimension);
//# sourceMappingURL=Dimension.js.map