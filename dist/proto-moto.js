'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.createFromProto = createFromProto;
exports.ensureProto = ensureProto;
exports.createProtoBuilder = createProtoBuilder;

var _prototypes = require('./prototypes');

/**
 * For easily create new object by proto, without any ugly constructors.
 *
 * @param {{}} proto
 * @param {{}} [protoProps]
 * @returns {Function}
 */
function createFromProto(proto, protoProps) {
    return function (implementation) {
        return Object.assign(Object.create(proto, protoProps), implementation);
    };
}

/**
 * For easy detect if original proto is prototype of instance;
 *
 * @param {{}} originalProto
 * @returns {Function}
 */
function ensureProto(originalProto) {
    return function (instance) {
        return (typeof originalProto === 'undefined' ? 'undefined' : _typeof(originalProto)) === 'object' && originalProto !== null ? originalProto.isPrototypeOf(instance) : false;
    };
}

/**
 * Create from parts proto builder
 *
 * @param {pProxy} proxy
 * @returns {Function}
 * @throws {TypeError} either if proxy isn't creates by pProxy or if initializer not a function
 */
function createProtoBuilder(proxy) {

    if (!ensureProto(_prototypes.pProxy)(proxy)) {
        throw new TypeError('"proxy" should be created by pProxy');
    }

    var proto = proxy.proto;
    var protoProperties = proxy.protoProperties;
    var initializer = proxy.initializer;
    var implementation = proxy.implementation;


    if (typeof initializer !== 'undefined' && typeof initializer !== 'function') {
        throw new TypeError('"proxy.initializer" should be a function');
    }

    var builder = function builder(options) {

        if (initializer) {
            implementation = Object.assign({}, implementation, initializer(options));
        }

        return createFromProto(proto, protoProperties)(implementation);
    };

    builder.ensureProto = ensureProto(proto);

    return builder;
}
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ensureProto = exports.createFromProto = exports.protoMoto = undefined;

var _prototypes = require('./prototypes');

var _functions = require('./functions');

/**
 * @returns {pProtoMoto}
 */
var protoMoto = function protoMoto() {
    var proxy = (0, _functions.createFromProto)(_prototypes.pProxy)();

    var api = {

        /**
         * Save to proxy your proto.
         *
         * @param {{}} proto
         * @param {{}} [protoProperties]
         * @returns {api}
         */
        thisIsMyProto: function thisIsMyProto(proto, protoProperties) {
            Object.assign(proxy, { proto: proto, protoProperties: protoProperties });

            return api;
        },

        /**
         * Save to proxy your implementation.
         *
         * @param {{}} implementation
         * @returns {api}
         */
        thisIsMyImplementation: function thisIsMyImplementation(implementation) {
            Object.assign(proxy, { implementation: implementation });

            return api;
        },

        /**
         * Save to proxy your initializer.
         *
         * @param {Function} initializer
         * @returns {api}
         */
        thisIsMyInitializer: function thisIsMyInitializer(initializer) {
            Object.assign(proxy, { initializer: initializer });

            return api;
        },

        /**
         * Create and return builder function by filled proxy object.
         *
         * @returns {Function}
         */
        giveMeBuilder: function giveMeBuilder() {
            return (0, _functions.createProtoBuilder)(proxy);
        }
    };

    return (0, _functions.createFromProto)(_prototypes.pProtoMoto)(api);
};

exports.protoMoto = protoMoto;
exports.createFromProto = _functions.createFromProto;
exports.ensureProto = _functions.ensureProto;
'use strict';

/**
 * @type {{thisIsMyProto, thisIsMyImplementation, thisIsMyInitializer, giveMeBuilder}}
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
var pProtoMoto = exports.pProtoMoto = {

  /**
   * @abstract
   *
   * @params {{}} protoWithProtoProperties
   *
   * @returns {pProtoMoto}
   */
  thisIsMyProto: function thisIsMyProto(protoWithProtoProperties) {
    throw new Error('.thisIsMyProto() not implemented');
  },

  /**
   * @abstract
   *
   * @param {{}} implementationObject
   *
   * @returns {pProtoMoto}
   */
  thisIsMyImplementation: function thisIsMyImplementation(implementationObject) {
    throw new Error('.thisIsMyImplementation() not implemented');
  },

  /**
   * @abstract
   *
   * @param {Function} initializeFunction
   *
   * @returns {pProtoMoto}
   */
  thisIsMyInitializer: function thisIsMyInitializer(initializeFunction) {
    throw new Error('.thisIsMyInitializer() not implemented');
  },

  /**
   * @abstract
   *
   * @returns {Function}
   */
  giveMeBuilder: function giveMeBuilder() {
    throw new Error('.giveMeBuilder() not implemented');
  }
};

/**
 * @type {{proto, protoProperties, initializer, implementation}}
 */
var pProxy = exports.pProxy = {

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
