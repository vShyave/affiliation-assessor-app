import pkg from '../../package.json';
import { Form } from 'samagra-x-enketo-core';

describe( 'Build checks: ', () => {
    it( 'Transformer matches Core', () => {
        expect( pkg.dependencies[ 'enketo-transformer' ] ).to.equal( Form.requiredTransformerVersion );
    } );
} );
