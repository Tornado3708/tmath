const data: Map<DataKey, DataValue> = new Map();

const buffer = {
  
  
  
  set ( target: Record<string, any> , parameter: DataKey, value: unknown) {
    if (!data.has(parameter)) data.set(parameter, new WeakMap());
    
    (data.get(parameter) as DataValue).set(target, value);
  },
  
  
  
  get (target: Record<string, any>, parameter: DataKey) {
    const list = data.get(parameter);
    
    if (!list)
      throw Error(`Parameter [${parameter}] is not defined in buffer.`);
    if (!list.has(target))
      throw Error(`Target doesn't have parameter [${parameter}].`);
    
    return list.get(target);
  },
  
  create (target: Record<string, any>, ...properties: DataKey[]) {
    
    for (const prop of properties) {
      Object.defineProperty((target || (target = {})), prop, {
        get: getFactory(prop),
        set: setFactory(prop)
      });
      
    }
    
    return target;
  }
};

const getterBuffer: Map<string, (this: Record<string, any>) => unknown> = new Map();
const setterBuffer: Map<string, (this: Record<string, any>, value: any) => void> = new Map();

function setFactory (prop: DataKey) {
  switch (prop) {
    case 'values':
      return createValuesSetter(prop);
    case 'yaw':
    case 'roll':
    case 'pitch':
      return createSlopeSetter(prop);
    default: 
      return createSetter(prop);
  }
}

function getFactory (prop: DataKey) {
  switch (prop) {
    case 'values':
      return createValuesGetter(prop);
    default:
      return createGetter(prop);
  }
}

export default Object.freeze({ create: buffer.create });


 

// functions region start


function createGetter (prop: DataKey) {
  return (getterBuffer.has(prop) ? getterBuffer : getterBuffer.set(prop, function (this: Record<string, any>) {
    return buffer.get(this, prop) as number;
  })).get(prop) as (this: Record<string, any>) => number;
}

function createValuesGetter (prop: 'values') {
  return (getterBuffer.has(prop) ? getterBuffer : getterBuffer.set(prop, function (this: Record<string, any>) {
    return [...buffer.get(this, prop)] as number[];
  })).get(prop) as (this: Record<string, any>) => number[];
}

function createSetter (prop: DataKey): (this: Record<string, any>, value: number) => void {
  return (setterBuffer.has(prop) ? setterBuffer : setterBuffer.set(prop, function (this: Record<string, any>, value: number) {
    buffer.set(this, prop, +value || 0);
  })).get(prop) as (this: Record<string, any>, value: number) => void;
}

function createValuesSetter (prop: 'values') {
  return (setterBuffer.has(prop) ? setterBuffer : setterBuffer.set(prop, function (this: Record<string, any>, value: number[]) {
    buffer.set(this, prop, value);
  })).get(prop);
}

function createSlopeSetter(prop: Slopes): (this: Record<string, any>, value: number) => void {
  return (setterBuffer.has(prop) ? setterBuffer : setterBuffer.set(prop, function (this: Record<string, any>, value: number) {
    buffer.set(this, prop, (+value % (2 * Math.PI)) || 0);
  })).get(prop) as (this: Record<string, any>, value: number) => void;
}

// functions region end

// types region start

type Axis = 'x' | 'y' | 'z';
type Slopes = 'roll' | 'pitch' | 'yaw';
type Dimensions = 'width' | 'height';
type DataKey = Axis | Slopes | Dimensions | 'radius' | 'values';


type DataValue = WeakMap<Record<string, any>, any>;


// types region end