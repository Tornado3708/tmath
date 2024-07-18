const list = [];
export const test = (description) => (equation) => (a) => (b) => {
    list.push(new Promise((res, rej) => {
        const status = equation(a, b);
        if (status)
            res(description);
        else
            rej(description);
    }));
};
export const finish = () => {
    list.forEach(promise => promise
        .then((message) => console.log(`\x1b[32mTest [${message}] passed.`))
        .catch((message) => console.log(`\x1b[31mTest [${message}] failed.`)));
};
