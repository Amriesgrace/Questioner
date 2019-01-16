import jwt from 'jsonwebtoken';
import config from '../configurations/config';

const key = config.secret_key;

const verifyUser = (req, res, next) => {
    const bearerHeader = req.headers.authorization;
    console.log('====', bearerHeader);
    if (!bearerHeader) {
        return res.status(401).json({
            status: 401,
            error: 'Auth Failed',
        });
    }
    const tokenHeader = bearerHeader.split(' ');
    const token = tokenHeader[1];

    console.log('-----', token);
    const decoded = jwt.verify(token, key);
    req.userdata = decoded;
    return next();
};

const checkAuth = {
    verifyUser,
};

export default checkAuth;
