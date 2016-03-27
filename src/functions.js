'use strict';

import { pProxy } from './prototypes';

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
    return (instance) => typeof originalProto === 'object' && originalProto !== null ?
        originalProto.isPrototypeOf(instance) : false;
}

/**
 * Create from parts proto builder
 *
 * @param {pProxy} proxy
 *
 * @returns {Function}
 * @throws {TypeError} either if proxy isn't creates by pProxy or if initializer not a function
 */
export function createProtoBuilder(proxy) {

    if (!ensureProto(pProxy)(proxy)) {
        throw new TypeError('"proxy" should be created by pProxy');
    }

    const { proto, protoProperties, initializer } = proxy;
    let { implementation } = proxy;

    if (typeof initializer !== 'undefined' && typeof initializer !== 'function') {
        throw new TypeError('"proxy.initializer" should be a function');
    }

    const builder = function builder(options) {

        if (initializer) {
            implementation = Object.assign({}, implementation, initializer(options));
        }

        return createFromProto(proto, protoProperties)(implementation);
    };

    builder.ensureProto = ensureProto(proto);

    return builder;
}
