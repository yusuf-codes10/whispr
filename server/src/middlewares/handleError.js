const handleError = (err, req, res, next) => {
    const statusCode = err.status || 500;
    const message = statusCode === 500 ? 'Internal Server Error!' : err.message;
    console.log(message);
    res.status(statusCode).json(message);
}

export default handleError;