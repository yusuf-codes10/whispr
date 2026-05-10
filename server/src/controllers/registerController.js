import createError from '../utils/createError.js';

const handleRegister = (req, res, next) => {
    const {name, email} = req.body;

    if (!name || !email) return next( createError(400, 'Please, include your name and email!'));

    res.status(200).send('It is working')
}

export default handleRegister;