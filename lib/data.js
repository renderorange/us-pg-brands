// data loader

const fs = require( 'fs' );
const path = require( 'path' );

const data = JSON.parse( fs.readFileSync( path.resolve( __dirname, './../data/brands.json' ), 'utf8' ) );

module.exports = data;
