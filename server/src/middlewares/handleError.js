const handleError = (err, req, res, next) => {
        console.log('ERROR RECEIVED:', err);
    console.log('STATUS:', err.status);
    console.log('MESSAGE:', err.message);

    const statusCode = err.status || 500;
    const message = statusCode === 500 ? 'Internal Server Error!' : err.message;
    res.status(statusCode).json(message);
}

export default handleError;