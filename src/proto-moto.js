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
        mountProto: function mountProto(proto, protoProperties) {
            Object.assign(proxy, {proto, protoProperties});

            return api;
        },

        /**
         * Save to proxy your implementation.
         *
         * @param {{}} implementation
         * @returns {pProtoMoto}
         */
        mountImplementation: function mountImplementation(implementation) {
            Object.assign(proxy, {implementation});

            return api;
        },

        /**
         * Save to proxy your initializer.
         *
         * @param {Function} initializer
         * @returns {pProtoMoto}
         */
        mountInitializer: function mountInitializer(initializer) {
            Object.assign(proxy, {initializer});

            return api;
        },

        /**
         * Create and return builder function by filled proxy object.
         *
         * @returns {Function}
         */
        getBuilder: function getBuilder() {
            return createProtoBuilder(proxy);
        }
    };

    return createFromProto(pProtoMoto)(api);
};

export {protoMoto, createFromProto, ensureProto};
