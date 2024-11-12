const ipRangeCheck = require('ip-range-check');

const allowedIPs = process.env.ALLOWED_IPS.split(',');

const whitelist = (req, res, next) => {
    const clientIP = (req.headers['x-forwarded-for'] || req.ip).split(',')[0].trim();
    if (ipRangeCheck(clientIP, allowedIPs)) {
        next();
    } else {
        res.status(403).send('Access denied');
    }
};

module.exports = whitelist;