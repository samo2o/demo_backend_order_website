require('dotenv').config();
const jwt = require('jsonwebtoken');

const HttpError = require("./http-error");
const User = require('./user-schema');

const checkAdmin = async (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next();
    }

    if (!req.headers.authorization) {
        return next(
            new HttpError(
                'No authorization token was found.',
                401
            )
        );
    }

    try {
        const TOKEN = req.headers.authorization.split(' ')[1];
        if (!TOKEN) {
            return next(
                new HttpError(
                    'No authorization token was found.',
                    401
                )
            );
        }

        const decodedToken = jwt.verify(TOKEN, process.env.SECRET_KEY);
        req.userData = { userId: decodedToken.userId, email: decodedToken.email };

        const userdata = await User.findById(decodedToken.userId);
        if (!userdata.admin || userdata.admin === false) {
            return next(
                new HttpError(
                    'Access to the requested resource is prohibited. Please check your permissions.',
                    403
                )
            )
        }
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return next(
                new HttpError(
                    'Token has expired. Please log in again.',
                    401
                )
            );
        }

        return next(
            error || 'Something went wrong while checking for admin authorization.'
        );
    }
}

module.exports = checkAdmin;
