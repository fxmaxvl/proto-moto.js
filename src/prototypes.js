'use strict';

/**
 * @type {pProtoMoto}
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
 * @type {pProxy}
 */
export const pProxy = {

    /**
     * @abstract
     */
    proto: {},

    /**
     * @abstract
     */
    protoProperties: {},

    /**
     * should be either function or undefined
     *
     * @abstract
     *
     * @param {{}} [options]
     */
    initializer: undefined,

    /**
     * @abstract
     */
    implementation: {}
};
