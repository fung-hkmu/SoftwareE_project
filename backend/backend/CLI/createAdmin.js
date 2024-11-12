const mongoose = require('mongoose');
const connectDB = require('../config/db');
const User = require('../data_model/user');
const bcrypt = require('bcryptjs');

const createAdminUser = async (username, password) => {
    await connectDB();
    const existingAdmin = await User.findOne({ username, role: 'admin' });
    if (existingAdmin) {
        console.log('Admin user already exists.');
        return;
    }
    const hashedPassword = bcrypt.hashSync(password, 8);
    const adminUser = new User({
        username,
        password: hashedPassword,
        role: 'admin',
    });
    await adminUser.save();
    console.log('Admin user created successfully!');
    mongoose.connection.close();
};

const args = process.argv.slice(2);
const [username, password] = args;

if (!username || !password) {
    console.error('Please provide a username and password for the admin user.');
    process.exit(1);
}

createAdminUser(username, password);

//node createAdmin username password