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
    list.forEach(promise => promise
        .then((message) => console.log(`\x1b[32mTest [${message}] passed.`))
        .catch((message) => console.log(`\x1b[31mTest [${message}] failed.`)));
};
exports.finish = finish;
