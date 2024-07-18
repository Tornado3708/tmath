type DimensionParameters = [width: number, height: number] | [dimension: Dimension] | [];
declare class Dimension {
    width: number;
    height: number;
    constructor(...args: DimensionParameters);
}
export default Dimension;
