const { check } = require('express-validator');


class validatorHelper {
    Login = () => {
        return [
            check('password')
                .isLength({ min: 5 })
                .withMessage('must be at least 5 chars long')
                .matches(/\d/)
                .withMessage('must contain a number'),
            check('email')
                .isEmail()
                .matches(/\d/)
                .withMessage('must contain a number')
        ]
    }
}
module.exports = new validatorHelper();