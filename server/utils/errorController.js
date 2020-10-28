const serverEnv = process.env.NODE_ENV;

const sendErrorDev = (err, res) => {
    res.status(err.statusCode).send({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    });
}

const sendErrorProd = (err, res) => {
    // Operation Error
    if (err.isOperational) {
        res.status(err.statusCode).send({
            status: err.status,
            message: err.message
        });
    } else {
        // Programming Error or unknown Error
        // 1. Log the error
        console.error('Error:', err);
        // 2. Send Generic Response to client
        res.status(500).send({
            status: 'Error',
            message: 'Something went wrong!'
        })
    }
}

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    // Error Mode
    if (serverEnv === 'development' || serverEnv === 'dev') {
        sendErrorDev(err, res);
    } else if (serverEnv === 'production' || serverEnv === 'prod') {
        sendErrorProd(err, res);
    }
    
};