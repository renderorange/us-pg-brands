// us-pg-brands

'use strict';

const version = '0.0.1';

const express = require( 'express' );
const config = require( './lib/config' );
const app = express();
const logger = require( 'morgan' );
const response = require( './lib/response' );

// disable unused headers
app.disable( 'etag' );
app.disable( 'x-powered-by' );

// routes
const root = require( './routes/root' );

app.use( logger( 'combined' ) );

// load the routes
app.use( '/', root );

// default routes
// NOT FOUND for any GET requests
app.get( '*', function( req, res ) {
    res.status( response.status.HTTP_NOT_FOUND.code )
       .header( 'Content-Type', 'text/plain' )
       .header( 'Connection', 'close' )
       .send( response.status.HTTP_NOT_FOUND.string );
});

// BAD REQUEST for anything else
app.use( function( req, res ) {
    res.status( response.status.HTTP_BAD_REQUEST.code )
       .header( 'Content-Type', 'text/plain' )
       .header( 'Connection', 'close' )
       .send( response.status.HTTP_BAD_REQUEST.string );
});

console.log( '[info] us-pg-brands - version ' + version );

app.listen( config.app.port, config.app.address, function() {
    console.log(
        '[info] server started\n' +
        '[info] serving: ' + config.app.address + ':' + config.app.port
    );
});

module.exports = app;
