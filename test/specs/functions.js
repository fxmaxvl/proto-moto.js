'use strict';

import { assert } from 'chai';
import { ensureProto, createFromProto } from '../../src/functions';

describe('src/functions', () => {
    const pSomeProto = {
        foo: () => 'bar'
    };

    describe('.ensureProto()', () => {

        it('should return true', () => {
            const someObject = Object.create(pSomeProto);
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
});
