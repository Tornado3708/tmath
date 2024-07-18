import { HasWidth, HasHeight } from "tmath";
import buffer from "./buffer.js";


type DimensionParameters = [width: number, height: number] | [dimension: Dimension] | [];
class Dimension {
  width!: number;
  height!: number;
  constructor (...args: DimensionParameters) {
    buffer.create(this, 'width', 'height');
    switch (args.length) {
      case 0: break;
      case 1: if ('width' in (args[0] as HasWidth) && 'height' in (args[0] as HasHeight))
        args = [(args[0] as HasWidth).width, (args[0] as HasHeight).height];
      case 2:
        [this.width, this.height] = args as [number, number];
    } 
  }
}


export default Dimension;