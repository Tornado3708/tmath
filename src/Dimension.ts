import { Dimension, DimensionConstructor } from "tmath";
import buffer from "./buffer.js";


const _dimension: DimensionConstructor = (width: number, height: number) => {
  const dimension = buffer.create('width', 'height') as Dimension;
  [dimension.width, dimension.height] = [width, height];
  return dimension;
};


export default Object.freeze(_dimension);