const User = require('../models/User');
const jwt = require('jsonwebtoken');
const maxAge = 60 * 60;
const secret = 'llong_Chat';
const createJWT = (id) => {
    return jwt.sign({ id }, secret, {
        expiresIn: maxAge
    })
}


const alertError = (err) => {
    const errors = { name: '', email: '', password: '' };

    if (err.message.includes('incorrect password')) {
        errors.password = "This password is incorrect"
    }

    if (err.message.includes('incorrect email')) {
        errors.email = "This email not found";
    }

    if (err.code === 11000) {
        errors.email = 'The email already registered';
        return errors;
    }

    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message
        })
    }


    return errors;
}
class AuthController {
    login(req, res, next) {
        return res.render('admin/login', {
            title: 'Đăng Nhập'
        })
    }

    signup = async (req, res) => {
        const { username, email, password } = req.body;
        console.log(name, email, password);

        try {
            const user = new User({ username, email, password });
            await user.save();
            const token = createJWT(user._id);
            res.cookie('jwt', token, {
                httpOnly: true,
                maxAge: maxAge * 1000
            });
            res.status(201).json({ user });
        } catch (error) {
            let errors = alertError(error);

            res.status(400).json({
                error: error.message,
                errors: errors
            })
        }
    }

    login = async (req, res) => {
        const { email, password } = req.body;
        // console.log(name, email, password);

        try {
            const user = await User.login(email, password);
            const token = createJWT(user._id);
            res.cookie('jwt', token, {
                httpOnly: true,
                maxAge: maxAge * 1000
            });
            res.status(201).json({ user });
        } catch (error) {
            let errors = alertError(error);

            res.status(400).json({
                error: error.message,
                errors: errors
            })
        }

    }

    // [GET] /admin/logout

    logout = (req, res) => {
        res.cookie('jwt', '', { maxAge: 1 });
        res.status(200).json({
            logout: true
        })
    }


}
module.exports = new AuthController();