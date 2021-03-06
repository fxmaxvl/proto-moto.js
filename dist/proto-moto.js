(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["protoMotoLib"] = factory();
	else
		root["protoMotoLib"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ensureProto = exports.createFromProto = exports.protoMoto = undefined;

	var _prototypes = __webpack_require__(1);

	var _functions = __webpack_require__(2);

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
	         * @returns {pProtoMoto}
	         */
	        mountProto: function mountProto(proto, protoProperties) {
	            Object.assign(proxy, { proto: proto, protoProperties: protoProperties });

	            return api;
	        },

	        /**
	         * Save to proxy your implementation.
	         *
	         * @param {{}} implementation
	         * @returns {pProtoMoto}
	         */
	        mountImplementation: function mountImplementation(implementation) {
	            Object.assign(proxy, { implementation: implementation });

	            return api;
	        },

	        /**
	         * Save to proxy your initializer.
	         *
	         * @param {Function} initializer
	         * @returns {pProtoMoto}
	         */
	        mountInitializer: function mountInitializer(initializer) {
	            Object.assign(proxy, { initializer: initializer });

	            return api;
	        },

	        /**
	         * Create and return builder function by filled proxy object.
	         *
	         * @returns {Function}
	         */
	        getBuilder: function getBuilder() {
	            return (0, _functions.createProtoBuilder)(proxy);
	        }
	    };

	    return (0, _functions.createFromProto)(_prototypes.pProtoMoto)(api);
	};

	exports.protoMoto = protoMoto;
	exports.createFromProto = _functions.createFromProto;
	exports.ensureProto = _functions.ensureProto;

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * @type {pProtoMoto}
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
	  mountProto: function mountProto(protoWithProtoProperties) {
	    throw new Error('.mountProto() not implemented');
	  },

	  /**
	   * @abstract
	   *
	   * @param {{}} implementationObject
	   *
	   * @returns {pProtoMoto}
	   */
	  mountImplementation: function mountImplementation(implementationObject) {
	    throw new Error('.mountImplementation() not implemented');
	  },

	  /**
	   * @abstract
	   *
	   * @param {Function} initializeFunction
	   *
	   * @returns {pProtoMoto}
	   */
	  mountInitializer: function mountInitializer(initializeFunction) {
	    throw new Error('.mountInitializer() not implemented');
	  },

	  /**
	   * @abstract
	   *
	   * @returns {Function}
	   */
	  getBuilder: function getBuilder() {
	    throw new Error('.getBuilder() not implemented');
	  }
	};

	/**
	 * @type {pProxy}
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

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	exports.createFromProto = createFromProto;
	exports.ensureProto = ensureProto;
	exports.createProtoBuilder = createProtoBuilder;

	var _prototypes = __webpack_require__(1);

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

/***/ }
/******/ ])
});
;