'use strict';

import { assert } from 'chai';
import { ensureProto, createFromProto, createProtoBuilder } from '../../src/functions';

describe('src/functions', () => {
    const pSomeProto = {
        foo: () => 'bar'
    };

    describe('.ensureProto()', () => {

        it('should return true', () => {
            const someObject      = Object.create(pSomeProto);
            const someOtherObject = Object.create(someObject);

            assert.isOk(
                ensureProto(pSomeProto)(someObject),
                'when object created exactly from proto'
            );

            assert.isOk(
                ensureProto(pSomeProto)(Object.assign(someObject, {foo: () => 'newBar'})),
                'when object created from proto and have some own property'
            );

            assert.isOk(
                ensureProto(pSomeProto)(someOtherObject),
                'when object created from object, that created exactly from proto'
            );
        });

        it('should return false, when object created from other proto', () => {
            const otherObject = Object.create(Object.assign({foobar: () => 'foobar'}, pSomeProto));

            assert.isNotOk(
                ensureProto(pSomeProto)(otherObject),
                'should be false'
            );

            assert.isNotOk(
                ensureProto(pSomeProto)({}),
                'should be false'
            );

            assert.isNotOk(
                ensureProto(pSomeProto)('not object'),
                'should be false'
            );
        });

        it('should return false, when proto is not valid', () => {
            assert.isNotOk(
                ensureProto(null)({}),
                'should be false'
            );

            assert.isNotOk(
                ensureProto(NaN)({}),
                'should be false'
            );

            assert.isNotOk(
                ensureProto('string')({}),
                'should be false'
            );

            assert.isNotOk(
                ensureProto([1, 2, 3])({}),
                'should be false'
            );

            assert.isNotOk(
                ensureProto()({}),
                'should be false'
            );
        });
    });

    describe('.createFromProto()', () => {

        it('should create by one proto many objects with different implementation', () => {
            const waitForImplementation = createFromProto(pSomeProto);
            const obj1                  = waitForImplementation({obj1: () => 'obj1'});
            const obj2                  = waitForImplementation({obj2: () => 'obj2'});

            assert.isOk(
                obj1.foo() === 'bar' && obj1.obj1() === 'obj1',
                'obj1 should have own and protos methods'
            );

            assert.isOk(
                obj2.foo() === 'bar' && obj2.obj2() === 'obj2',
                'obj2 should have own and protos methods'
            );

            assert.isOk(ensureProto(pSomeProto)(obj1), 'pSomeProto should be proto of obj1');
            assert.isOk(ensureProto(pSomeProto)(obj2), 'pSomeProto should be proto of obj2');
        });

        it('should thrown error', () => {
            assert.throws(() => createFromProto()({}), TypeError);
            assert.throws(() => createFromProto(NaN)({}), TypeError);
            assert.throws(() => createFromProto(1)({}), TypeError);
            assert.throws(() => createFromProto('qwerty')({}), TypeError);
            assert.throws(() => createFromProto({}, null)({}), TypeError);
            assert.throws(() => createFromProto({}, 'qwerty')({}), TypeError);
        });
    });

    describe('.createProtoBuilder()', () => {

        it('should thrown error in called with not pProxy', () => {
            assert.throws(
                () => createProtoBuilder(),
                TypeError,
                '"proxy" should be created by pProxy'
            );

            assert.throws(
                () => createProtoBuilder({}),
                TypeError,
                '"proxy" should be created by pProxy'
            );

            assert.throws(
                () => createProtoBuilder(123),
                TypeError,
                '"proxy" should be created by pProxy'
            );

            assert.throws(
                () => createProtoBuilder(NaN),
                TypeError,
                '"proxy" should be created by pProxy'
            );
        });

    });
});
