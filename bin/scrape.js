'use strict';

const axios = require( 'axios' );
const jsdom = require( 'jsdom' );
const { JSDOM } = jsdom;

const fs = require( 'fs' );
const path = require( 'path' );

axios.get( 'https://us.pg.com/brands/' )
    .then( function( response ) {
        let content = response.data;
        const dom = new JSDOM( content );

        let brands_props = dom.window.document.querySelector( '[data-react-component="BrandContainer"]' )
                              .getAttribute( 'data-react-props' );

        if ( brand_props ) {
            fs.writeFile( path.resolve( __dirname, './../data/props.json' ), brands_props, function( err, data ) {
                if ( err ) {
                    return console.log( err );
                }
            });
        }
        else {
            console.log( 'brands data was not found' );
        }
    })
    .catch( function( error ) {
        console.log( error );
    });
