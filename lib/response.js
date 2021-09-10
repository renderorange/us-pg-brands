// status codes and strings for the routes

const status = {
    // successes
    'HTTP_OK' : {
        code   : '200',
        string : 'OK.',
    },

    // client errors
    'HTTP_BAD_REQUEST'  : {
        code   : '400',
        string : "Whoops, something isn't correct with your request.",
    },
    'HTTP_UNAUTHORIZED' : {
        code   : '401',
        string : 'You are not authenticated.',
    },
    'HTTP_FORBIDDEN'    : {
        code   : '403',
        string : 'You are not authorized to access this resource.',
    },
    'HTTP_NOT_FOUND'    : {
        code   : '404',
        string : 'That resource was not found.',
    },
    'HTTP_CONFLICT'     : {
        code   : '409',
        string : 'That resource already exists.',
    },

    // server errors
    'HTTP_INTERNAL_SERVER_ERROR' : {
        code   : '500',
        string : 'Whoops, something went wrong on our end.',
    },
};

module.exports.status = status
