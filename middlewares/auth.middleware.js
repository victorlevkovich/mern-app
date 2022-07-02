const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') { // checking server accesibility
        return next();
    }

    try {
        const token = req.headers.authorization.split(' ')[1] // req.headers.authorization is "Bearer {auth.token}" and here we should take OUR TOKEN.

        if (!token) {
            return res.status(401).json({ message: 'No authorizaion!' });
        }

        const decodedToken = jwt.verify(token, config.get('jwtSecret')) // we should pass secret second parameter to decode our token.
        req.user = decodedToken ;

        next();

    } catch (e) {
        res.status(401).json({ message: 'No authorizaion!!!' });
    }
}