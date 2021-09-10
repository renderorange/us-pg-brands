// us-pg-brands application settings

const fs = require( 'fs' );
const path = require( 'path' );

const config = JSON.parse( fs.readFileSync( path.resolve( __dirname, './../.us-pg-brands-rc' ), 'utf8' ) );

module.exports = config;
