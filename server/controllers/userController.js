const User = require("../models/userModel");
const bcrypt = require("bcrypt");

module.exports.getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        return res.json(users);
    } catch (ex) {
        next(ex);
    }
};

module.exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user)
            return res.json({ msg: "Falsche Mail oder Passwort", status: false });
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid)
            return res.json({ msg: "Falsche Mail oder Passwort", status: false });
        delete user.password;
        return res.json({ status: true, user });
    } catch (ex) {
        next(ex);
    }
};

module.exports.register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const usernameCheck = await User.findOne({ username });
        if (username.length > 16)
            return res.json({ msg: "Der Nutzername ist zu lang.", status: false });
        if (usernameCheck)
            return res.json({ msg: "Der Nutzername ist bereits vergeben.", status: false });
        const emailCheck = await User.findOne({ email });
        if (emailCheck)
            return res.json({ msg: "Die eMail ist bereits vergeben.", status: false });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            email,
            username,
            password: hashedPassword
        });
        return res.json({ status: true, user });
    } catch (ex) {
        next(ex);
    }
};

module.exports.logout = (req, res, next) => {
    try {
        if (!req.params.id) return res.json({ msg: "User id is required " });
        return res.status(200).send();
    } catch (ex) {
        next(ex);
    }
};