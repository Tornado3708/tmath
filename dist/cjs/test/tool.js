(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.finish = exports.test = void 0;
    const list = [];
    const test = (description) => (equation) => (a) => (b) => {
        list.push(new Promise((res, rej) => {
            const status = equation(a, b);
            if (status)
                res(description);
            else
                rej(description);
        }));
    };
    exports.test = test;
    const finish = () => {
        list.forEach((promise, i) => promise
            .then((message) => console.log(`\x1b[32mTest ${i + 1} [${message}] passed.`))
            .catch((message) => console.log(`\x1b[31mTest ${i + 1} [${message}] failed.`)));
    };
    exports.finish = finish;
});
