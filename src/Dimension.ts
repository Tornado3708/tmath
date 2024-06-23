import buffer from "./buffer.js";
import { DimensionConstructor, HasWidth, HasHeight, Dimension } from "tmath";


const _dimension: DimensionConstructor = (...args) => {
  if (typeof args[0] === 'object') {
    return _dimension( ...(Reflect.has(args[0], 'width') && Reflect.has(args[0], 'height'))
      ? [(args[0] as HasWidth).width, (args[0] as HasHeight).height]
      : [0, 0]
    );
  } else {
    const dimension = buffer.create('width', 'height') as Dimension;
    [dimension.width, dimension.height] = args as [number, number];
    return dimension;
  }
};


export default Object.freeze(_dimension);