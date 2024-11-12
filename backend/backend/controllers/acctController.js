const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../data_model/user');

exports.userData = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).send({ message: 'user not found' });
        }
        res.status(200).send(user);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal server error' });
    }
};