import { width, height } from "./buffers";
import { HasDimension } from "./types";


class Dimension {
  constructor ();
  constructor (width: number, height: number);
  constructor (d: HasDimension);
  constructor (...args: any[]) {
    width .set(this, 0);
    height.set(this, 0);

    switch (args.length) {
      case 0: break;
      case 1:
        this.width  = args[0]?.width;
        this.height = args[0]?.height;
      default:
        [this.width, this.height] = args;
    }
  }
}

{
  const defaultDescriptor = { configurable: !1, enumerable: !1 };

  const describeAccessor = (buffer: WeakMap<HasDimension, number>, descriptor = defaultDescriptor) => Object.assign({
    set (this: HasDimension, value: number) { buffer.set(this, +value || 0) },
    get (this: HasDimension) { return buffer.get(this) || 0 }
  }, descriptor);

  Object.defineProperties(Dimension.prototype, {
    width  : describeAccessor(width),
    height : describeAccessor(height)
  });
}



export default Dimension;


interface Dimension {
  width: number;
  height: number;
}