import Vector2D from "./Vector2D.js";
function createDescriptor() {
    const vectors = [0, 0].map(() => new Vector2D());
    return {
        ['x1']: { set(x1) { vectors[0].x = x1; }, get() { return vectors[0].x; } },
        ['x2']: { set(x2) { vectors[1].x = x2; }, get() { return vectors[1].x; } },
        ['y1']: { set(y1) { vectors[0].y = y1; }, get() { return vectors[0].y; } },
        ['y2']: { set(y2) { vectors[1].y = y2; }, get() { return vectors[1].y; } },
    };
}
export default class Line2D {
    constructor(...args) {
        Object.defineProperties(this, createDescriptor());
        switch (args.length) {
            case 0: return this;
            case 1:
                this.x1 = args[0].x1;
                this.x2 = args[0].x2;
                this.y1 = args[0].y1;
                this.y2 = args[0].y2;
            case 2:
                [this.x1, this.y1] = Vector2D.toArray(args[0]);
                [this.x2, this.y2] = Vector2D.toArray(args[1]);
            default: [this.x1, this.y1, this.x2, this.y2] = args;
        }
    }
}
