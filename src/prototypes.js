'use strict';

/**
 * @type {{thisIsMyProto, thisIsMyImplementation, thisIsMyInitializer, giveMeBuilder}}
 */
export const pProtoMoto = {

    /**
     * @abstract
     *
     * @params {{}} protoWithProtoProperties
     *
     * @returns {pProtoMoto}
     */
    thisIsMyProto: (protoWithProtoProperties) => {
        throw new Error('.thisIsMyProto() not implemented');
    },

    /**
     * @abstract
     *
     * @param {{}} implementationObject
     *
     * @returns {pProtoMoto}
     */
    thisIsMyImplementation: (implementationObject) => {
        throw new Error('.thisIsMyImplementation() not implemented');
    },

    /**
     * @abstract
     *
     * @param {Function} initializeFunction
     *
     * @returns {pProtoMoto}
     */
    thisIsMyInitializer: (initializeFunction) => {
        throw new Error('.thisIsMyInitializer() not implemented');
    },

    /**
     * @abstract
     *
     * @returns {Function}
     */
    giveMeBuilder: () => {
        throw new Error('.giveMeBuilder() not implemented');
    }
};

/**
 * @type {{proto, protoProperties, initializer, implementation}}
 */
export const pProxy = {

    /**
     * @abstract
     */
    proto: () => {
        throw new Error('.proto() not implemented');
    },

    /**
     * @abstract
     */
    protoProperties: () => {
        throw new Error('.protoProperties() not implemented');
    },

    /**
     * @abstract
     *
     * @param {{}} [options]
     */
    initializer: (options) => {
        throw new Error('.initializer() not implemented');
    },

    /**
     * @abstract
     */
    implementation: () => {
        throw new Error('.implementation() not implemented');
    }
};
