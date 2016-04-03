'use strict';

import { pProtoMoto, pProxy } from './prototypes';
import { createFromProto, ensureProto, createProtoBuilder } from './functions';

/**
 * @returns {pProtoMoto}
 */
const protoMoto = function protoMoto() {
    const proxy = createFromProto(pProxy)();

    const api = {

        /**
         * Save to proxy your proto.
         *
         * @param {{}} proto
         * @param {{}} [protoProperties]
         * @returns {pProtoMoto}
         */
        thisIsMyProto: function thisIsMyProto(proto, protoProperties) {
            Object.assign(proxy, {proto, protoProperties});

            return api;
        },

        /**
         * Save to proxy your implementation.
         *
         * @param {{}} implementation
         * @returns {pProtoMoto}
         */
        thisIsMyImplementation: function thisIsMyImplementation(implementation) {
            Object.assign(proxy, {implementation});

            return api;
        },

        /**
         * Save to proxy your initializer.
         *
         * @param {Function} initializer
         * @returns {pProtoMoto}
         */
        thisIsMyInitializer: function thisIsMyInitializer(initializer) {
            Object.assign(proxy, {initializer});

            return api;
        },

        /**
         * Create and return builder function by filled proxy object.
         *
         * @returns {Function}
         */
        giveMeBuilder: function giveMeBuilder() {
            return createProtoBuilder(proxy);
        }
    };

    return createFromProto(pProtoMoto)(api);
};

export {protoMoto, createFromProto, ensureProto};
