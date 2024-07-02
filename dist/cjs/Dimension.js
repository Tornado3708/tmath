"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const buffer_js_1 = __importDefault(require("./buffer.js"));
class Dimension {
    constructor(...args) {
        buffer_js_1.default.create(this, 'width', 'height');
        switch (args.length) {
            case 0: break;
            case 1: if ('width' in args[0] && 'height' in args[0])
                args = [args[0].width, args[0].height];
            case 2:
                [this.width, this.height] = args;
        }
    }
}
exports.default = Dimension;
//# sourceMappingURL=Dimension.js.map