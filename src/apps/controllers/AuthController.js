const { validationResult } = require('express-validator');
class AuthController {
    // [GET] /admin/login
    login(req, res) {
        return res.render('admin/login', {
            title: 'Đăng Nhập'
        })
    }
    // [POST] /admin/login
    postLogin(req, res) {

        try {
            const { email, password } = req.body;
            console.log(req.body);
            const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
                return `${location}[${param}]: ${msg}`;
            };
            const result = validationResult(req).formatWith(errorFormatter);
            if (!result.isEmpty()) {
                console.log({ errors: result.array() });
            }
        } catch (error) {
            return res.render("admin/login", {
                title: "Đăng Nhập",
                error: "Lỗi"
            });
        }

        return res.render('admin/login', {
            title: 'Đăng Nhập'
        })
    }
}

module.exports = new AuthController();