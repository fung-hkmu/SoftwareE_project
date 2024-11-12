const jwt = require('jsonwebtoken');

const verifyRole = (requiredRole) => {
    return (req, res, next) => {
        const token = req.headers['authorization']?.split(' ')[1];

        if (!token) {
            return res.status(403).send({ message: 'No token provided!' });
        }

        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).send({ message: 'Unauthorized!' });
            }
            if (decoded.role === requiredRole) {
                req.userId = decoded.id;
                req.userRole = decoded.role;
                next();
            } else {
                return res.status(403).send({ message: `Require ${requiredRole} Role!` });
            }
        });
    };
};

module.exports = verifyRole;