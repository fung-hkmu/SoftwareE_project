const authRoutes = require('./authRoutes');
const acctRoutes = require('./acctRoutes');
const imageRoutes = require('./imageRoutes');
const meunRoutes = require('./meunRoutes');

const initRoutes = (app) => {
    app.use('/api/auth', authRoutes);
    app.use('/api/acct', acctRoutes);
    app.use('/api/image', imageRoutes);
    app.use('/api/meun', meunRoutes);
};

module.exports = initRoutes;