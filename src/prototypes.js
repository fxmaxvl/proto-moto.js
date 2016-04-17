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
    mountProto: (protoWithProtoProperties) => {
        throw new Error('.mountProto() not implemented');
    },

    /**
     * @abstract
     *
     * @param {{}} implementationObject
     *
     * @returns {pProtoMoto}
     */
    mountImplementation: (implementationObject) => {
        throw new Error('.mountImplementation() not implemented');
    },

    /**
     * @abstract
     *
     * @param {Function} initializeFunction
     *
     * @returns {pProtoMoto}
     */
    mountInitializer: (initializeFunction) => {
        throw new Error('.mountInitializer() not implemented');
    },

    /**
     * @abstract
     *
     * @returns {Function}
     */
    getBuilder: () => {
        throw new Error('.getBuilder() not implemented');
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
