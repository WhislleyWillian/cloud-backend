const bcrypt = require('bcrypt');
const User = require('../models/User');

class UserController {

    async allUsers(req, res) {
        const users = await User.find()
            .then(results => res.json(results))
            .catch(err => res.send(err));
        return res.json(users);
    }

    async register(req, res) {
        if (req.body.username && req.body.password) {
            if (req.body.password && req.body.password2 == req.body.password) {

                User.findOne({ 'username': req.body.username })
                    .then(user => {
                        if (user) {
                            return res.json({ success: false, message: 'This username has no available' });
                        } else {
                            bcrypt.hash(req.body.password, 10).then(hash => {
                                let encryptedPassword = hash;
                                let newUser = new User({
                                    username: req.body.username,
                                    password: encryptedPassword,
                                    email: req.body.email
                                });

                                newUser.save()
                                    .then(() => res.json({ success: true, message: 'User created with success', statusCode: 201, newUser }))
                                    .catch(err => res.json({ success: false, message: err, statusCode: 500 }));
                            })

                            .catch(err => res.json({ success: false, message: err, statusCode: 500 }));
                        }
                    })
            } else {
                return res.json({ success: false, message: 'Passwords doesnt match', statusCode: 400 });
            }
        } else {
            return res.json({ success: false, message: 'Username and password fields are requireds', statusCode: 400 });
        }
    }

    async login(req, res) {

        if (req.body.username && req.body.password) {

            User.findOne({ 'username': req.body.username })
                .then(user => {
                    if (user) {
                        if (bcrypt.compare(req.body.password, user.password)) {
                            return res.json({ success: true, message: 'Login successfully completed', statusCode: 201, user });
                        }
                    } else {
                        return res.json({ success: false, message: 'User not found', statusCode: 500, user });
                    }
                })
        } else {
            return res.json({ success: false, message: 'Username and password fields are requireds', statusCode: 400 });
        }
    }

    async getUser(req, res) {
        if (req.body.username) {
            User.findOne({ 'username': req.body.username })
                .then(user => {
                    if (user) {
                        return res.json({ user });
                    } else {
                        return res.json({ success: false, message: 'User not found', statusCode: 500, user, encryptedPassword });
                    }
                })
        }
    }
}

module.exports = new UserController();