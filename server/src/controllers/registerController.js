import createError from './utils/createError.js';

const handleRegister = (req, res, next) => {
    const {name, email} = req.body;

    if (!name || !email) throw createError(400, 'Please, include your name and email!');
}

export default handleRegister;