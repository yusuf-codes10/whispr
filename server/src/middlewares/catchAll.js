const catchAll = (req, res, next) => {
    const error = new Error('Route does not exist!');
    error.status(404);
    next(error);
}

export default catchAll;