'use strict';

const router = require( 'express' ).Router();
const fs = require( 'fs' );
//const debug = require( 'debug' )( 'form controller' );
const manifest = require( '../models/formManifest' );
const path = require( 'path' );
// const formStoragePath = path.resolve( __dirname, '../../storage/forms' );

const { Storage } = require('@google-cloud/storage');
const storage = new Storage({
    projectId: "upsmf-368011",
    keyFilename: "keys/service-account-key.json"
  });

const GCS_BUCKET_NAME =  "dev-public-upsmf";
const bucket = storage.bucket(GCS_BUCKET_NAME);


module.exports = function( app ) {
    app.use( '/form', router );
};

router
    .param( 'formId', ( req, res, next, id ) => {
        req.formId = id;
        next();
    } )
    .param( 'filename', ( req, res, next, id ) => {
        req.filename = id;
        next();
    } );

// router
//     .get( '*', function( req, res, next ) {
//         // console.log( 'xform/media Authorization request header', req.headers.authorization );
//         next();
//     } )
//     .get( '/:formId/form.xml', ( req, res, next ) => {
//         res.set( {
//             'Content-Type': 'text/xml'
//         } );
//         fs.createReadStream( path.join( formStoragePath, req.formId + '.xml' ) ).pipe( res );
//     } )
//     .get( '/:formId/manifest.xml', ( req, res, next ) => {
//         res.set( {
//             'Content-Type': 'text/xml'
//         } );
//         manifest.get( req.formId, req.protocol + '://' + req.headers.host )
//             .then( manifest => {
//                 res.send( manifest.toString() );
//             } )
//             .catch( next );
//     } )
//     .get( '/:formId/media/:filename', ( req, res, next ) => {
//         const file = fs.createReadStream(path.join( formStoragePath, req.formId + '-media', req.filename ) );
//         res.contentType(req.params.filename);
//         file.pipe( res );
//     } );


router
    .get('*', function(req, res, next) {
        // console.log( 'xform/media Authorization request header', req.headers.authorization );
        next();
    })
    .get('/:formId/form.xml', async (req, res, next) => {
        res.set({
            'Content-Type': 'text/xml'
        });

        try {
            
            const file = bucket.file(`affiliation/${req.formId}.xml`);
            const stream = file.createReadStream();
            stream.pipe(res);
        } catch (error) {
            console.error("Error in creating read stream");
            next(error);
        }
    })
    .get('/:formId/manifest.xml', async (req, res, next) => {
        res.set({
            'Content-Type': 'text/xml'
        });

        try {
            const baseUrl = `${req.protocol}://${req.headers.host}`;
            const manifestXml = await manifest.get(req.formId, baseUrl);
            res.send(manifestXml.toString());
        } catch (error) {
            next(error);
        }
    })
    .get('/:formId/media/:filename', async (req, res, next) => {
        try {
            const file = bucket.file(`affiliation/${req.formId}-media/${req.filename}`);
            const stream = file.createReadStream();
            const [metadata] = await file.getMetadata();
            res.contentType(metadata.contentType);
            stream.pipe(res);
        } catch (error) {
            console.error("Error in getting meta data from stream");
            next(error);
        }
    });