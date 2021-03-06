const jwt = require('jsonwebtoken');

/* Its without passport auth check Pratik*/
module.exports = {
    validateToken: (req, res, next) => {
        const authorizationHeaader = req.headers.authorization;
        let result;
        if (authorizationHeaader) {
            const token = req.headers.authorization.split(' ')[1];
            const options = {
                expiresIn: '30m'
            };
            try {

                result = jwt.verify(token, process.env.JWT_SECRET, options);
                req.decoded = result;
                next();
            } catch (err) {
                result = {
                    error: err,
                    status: 500

                };
                res.status(401).send(result);
            }
        } else {
            result = {
                error: 'Authentication error. Token required.',
                status: 401
            };
            res.status(401).send(result);
        }
    }
};