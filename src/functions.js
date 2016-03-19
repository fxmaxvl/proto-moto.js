'use strict';

/**
 * For easily create new object by proto, without any ugly constructors.
 *
 * @param {{}} proto
 * @param {{}} [protoProps]
 *
 * @returns {Function}
 */
export function createFromProto(proto, protoProps) {
    return (implementation) => Object.assign(Object.create(proto, protoProps), implementation);
}

/**
 * For easy detect if original proto is prototype of instance;
 *
 * @param {{}} originalProto
 *
 * @returns {Function}
 */
export function ensureProto(originalProto) {
    return (instance) => typeof originalProto === 'object' ? originalProto.isPrototypeOf(instance) : false;
}

/**
 * Create from parts proto builder
 *
 * @param {{}} parts
 *
 * @returns {Function}
 */
export function createProtoBuilder(parts) {
    const { proto, protoProperties } = parts;
    let { implementation, initializer } = parts;

    const builder = (options) => {

        if (typeof initializer === 'function') {
            implementation = Object.assign({}, implementation, initializer(options));
        }

        return createFromProto(proto, protoProperties)(implementation);
    };

    builder.ensureProto = ensureProto(proto);

    return builder;
}