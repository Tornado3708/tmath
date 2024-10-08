declare const _default: Readonly<{
    create: (target: Record<string, any>, ...properties: DataKey[]) => Record<string, any>;
}>;
export default _default;
type Axis = 'x' | 'y' | 'z';
type Slopes = 'roll' | 'pitch' | 'yaw';
type Dimensions = 'width' | 'height';
type DataKey = Axis | Slopes | Dimensions | 'radius' | 'values';
