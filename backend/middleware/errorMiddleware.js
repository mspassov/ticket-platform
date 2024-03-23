const errorHandler = (error, req, res, next) =>{
    const statusCode = res.statusCode;
    res.status(statusCode).json({
        message: error.message,
        stack: process.env.NODE_ENV="development" ? error.stack : null
    })
}

module.exports = errorHandler;