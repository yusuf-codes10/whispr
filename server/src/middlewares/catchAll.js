const catchAll = (req, res, next) => {
    next(createError(404, 'Route does not exist!'));
}

export default catchAll;