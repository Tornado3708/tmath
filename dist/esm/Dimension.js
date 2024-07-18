import buffer from "./buffer.js";
class Dimension {
    constructor(...args) {
        buffer.create(this, 'width', 'height');
        switch (args.length) {
            case 0: break;
            case 1: if ('width' in args[0] && 'height' in args[0])
                args = [args[0].width, args[0].height];
            case 2:
                [this.width, this.height] = args;
        }
    }
}
export default Dimension;
