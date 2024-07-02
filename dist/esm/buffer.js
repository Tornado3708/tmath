const data = new Map();
const buffer = {
    set(target, parameter, value) {
        if (!data.has(parameter))
            data.set(parameter, new WeakMap());
        data.get(parameter).set(target, value);
    },
    get(target, parameter) {
        const list = data.get(parameter);
        if (!list)
            throw Error(`Parameter [${parameter}] is not defined in buffer.`);
        if (!list.has(target))
            throw Error(`Target doesn't have parameter [${parameter}].`);
        return list.get(target);
    },
    create(target, ...properties) {
        for (const prop of properties) {
            Object.defineProperty((target || (target = {})), prop, {
                get: getFactory(prop),
                set: setFactory(prop)
            });
        }
        return target;
    }
};
const getterBuffer = new Map();
const setterBuffer = new Map();
function setFactory(prop) {
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
function getFactory(prop) {
    switch (prop) {
        case 'values':
            return createValuesGetter(prop);
        default:
            return createGetter(prop);
    }
}
export default Object.freeze({ create: buffer.create });
// functions region start
function createGetter(prop) {
    return (getterBuffer.has(prop) ? getterBuffer : getterBuffer.set(prop, function () {
        return buffer.get(this, prop);
    })).get(prop);
}
function createValuesGetter(prop) {
    return (getterBuffer.has(prop) ? getterBuffer : getterBuffer.set(prop, function () {
        return [...buffer.get(this, prop)];
    })).get(prop);
}
function createSetter(prop) {
    return (setterBuffer.has(prop) ? setterBuffer : setterBuffer.set(prop, function (value) {
        buffer.set(this, prop, +value || 0);
    })).get(prop);
}
function createValuesSetter(prop) {
    return (setterBuffer.has(prop) ? setterBuffer : setterBuffer.set(prop, function (value) {
        buffer.set(this, prop, value);
    })).get(prop);
}
function createSlopeSetter(prop) {
    return (setterBuffer.has(prop) ? setterBuffer : setterBuffer.set(prop, function (value) {
        buffer.set(this, prop, (+value % (2 * Math.PI)) || 0);
    })).get(prop);
}
// types region end
//# sourceMappingURL=buffer.js.map