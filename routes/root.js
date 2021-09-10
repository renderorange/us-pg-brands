// root routes

const express = require( 'express' );
const router = express.Router();
const data = require( './../lib/data' );
const response = require( './../lib/response' );

router.get( '/', function ( req, res ) {
    res.status( response.status.HTTP_OK.code )
       .header( 'Content-Type', 'application/json' )
       .header( 'Connection', 'close' )
       .send( data );
});

module.exports = router;
