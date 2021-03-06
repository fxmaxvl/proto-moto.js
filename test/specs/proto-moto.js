'use strict';

import { assert } from 'chai';
import { protoMoto, ensureProto, createFromProto } from '../../src/proto-moto';
import { pProtoMoto } from '../../src/prototypes';

describe('src/proto-moto', () => {
    const pSomeProto = {
        foo: () => 'bar'
    };

    it('.protoMoto() should return pProtoMoto object', () => {
        assert.isOk(ensureProto(pProtoMoto)(protoMoto()));
    });

    describe('use of protoMoto', () => {
        const pmCreator = protoMoto()
            .mountProto(pSomeProto, {
                protoProp: {value: 'protoProp'}
            })
            .mountImplementation({
                implemProp: 'implemProp'
            })
            .mountInitializer((options) => {
                return Object.assign({
                    initProp: 'initProp'
                }, options);
            });

        it('should return a valid builder', () => {
            const someObj = createFromProto(pSomeProto)();
            const builder = pmCreator.getBuilder();
            const newObj  = builder();

            assert.isOk(
                builder.ensureProto(someObj),
                'should return true for obj created by same proto as builder was initialized'
            );

            assert.strictEqual(
                newObj.protoProp, 'protoProp',
                'should have props from protoProperties'
            );

            assert.strictEqual(
                newObj.implemProp, 'implemProp',
                'should have props from implementation'
            );

            assert.strictEqual(
                newObj.initProp, 'initProp',
                'should have props from initializer'
            );
        });

        it('should rewrite proto part of proxy on each call .mountProto()', () => {
            const pSomeOtherProto = {some: 'proto'};
            const someObj         = createFromProto(pSomeProto)();
            const someOtherObj    = createFromProto(pSomeOtherProto)();
            const builder         = pmCreator.mountProto(pSomeOtherProto).getBuilder();

            assert.isNotOk(
                builder.ensureProto(someObj),
                'should return false for obj created by not same proto as builder was initialized'
            );

            assert.isOk(
                builder.ensureProto(someOtherObj),
                'should return true for obj created by same proto as builder was initialized'
            );
        });

        it('should rewrite all parts of proxy on each call', () => {
            const builder = pmCreator
                .mountImplementation({
                    implemProp2: 'implemProp2'
                })
                .mountInitializer(() => {
                    return {
                        initProp2: 'initProp2'
                    };
                })
                .getBuilder();
            const newObj  = builder();

            assert.notEqual(
                newObj.implemProp, 'implemProp',
                'old implemProp should not be exist'
            );

            assert.strictEqual(
                newObj.implemProp2, 'implemProp2',
                'new implemProp2 should be exist'
            );

            assert.notEqual(
                newObj.initProp, 'initProp',
                'old initProp should not be exist'
            );

            assert.strictEqual(
                newObj.initProp2, 'initProp2',
                'new initProp should be exist'
            );
        });
    });
});
