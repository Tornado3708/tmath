(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../Rectangle.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Rectangle_js_1 = require("../Rectangle.js");
    let rect;
    rect = new Rectangle_js_1.default();
    rect = new Rectangle_js_1.default(1, 2);
    rect = new Rectangle_js_1.default(1, 2, 3, 4);
    exports.default = {};
});
