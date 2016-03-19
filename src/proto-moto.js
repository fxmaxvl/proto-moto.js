'use strict';

import { pProtoMoto } from './prototypes';
import { createFromProto, ensureProto, createProtoBuilder } from './functions';

/**
 * @returns {pProtoMoto}
 */
const protoMoto = function protoMoto() {
    const proxy = {};

    const api = {
        thisIsMyProto: function thisIsMyProto(proto, protoProperties) {
            Object.assign(proxy, {proto, protoProperties});

            return api;
        },

        thisIsMyImplementation: function thisIsMyImplementation(implementation) {
            Object.assign(proxy, {implementation});

            return api;
        },

        thisIsMyInitializer: function thisIsMyInitializer(initializer) {
            Object.assign(proxy, {initializer});

            return api;
        },

        giveMeBuilder: function giveMeBuilder() {
            return createProtoBuilder(proxy);
        }
    };

    return createFromProto(pProtoMoto)(api);
};

export default {protoMoto, createFromProto, ensureProto};
