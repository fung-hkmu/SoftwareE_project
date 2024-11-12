const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../data_model/user');

exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = bcrypt.hashSync(password, 8);
        const user = new User({ username, password: hashedPassword });
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).send({ message: 'Username already exists' });
        }
        await user.save();
        res.status(201).send({ message: 'register success' });
    } catch (error) {
        res.status(500).send({ message: 'register fail', error });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(404).send({ message: 'wrong username or password' });
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
        return res.status(404).send({ message: 'wrong username or password' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.SECRET_KEY, { expiresIn: 86400 });
    res.status(200).send({ accessToken: token });
};