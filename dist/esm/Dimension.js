import buffer from "./buffer.js";
const _dimension = (width, height) => {
    const dimension = buffer.create('width', 'height');
    [dimension.width, dimension.height] = [width, height];
    return dimension;
};
export default Object.freeze(_dimension);
