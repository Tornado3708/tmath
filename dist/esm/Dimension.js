import buffer from "./buffer.js";
const _dimension = (...args) => {
    if (typeof args[0] === 'object') {
        return _dimension(...(Reflect.has(args[0], 'width') && Reflect.has(args[0], 'height'))
            ? [args[0].width, args[0].height]
            : [0, 0]);
    }
    else {
        const dimension = buffer.create('width', 'height');
        [dimension.width, dimension.height] = args;
        return dimension;
    }
};
export default Object.freeze(_dimension);
//# sourceMappingURL=Dimension.js.map