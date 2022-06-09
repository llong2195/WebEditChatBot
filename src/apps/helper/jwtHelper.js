const jwt = require('jsonwebtoken');
const config = require('config');

const JWT_ACCESS_TOKEN_LIFE = config.get("app").JWT_ACCESS_TOKEN_LIFE;
const JWT_ACCESS_TOKEN_SECRET = config.get("app").JWT_ACCESS_TOKEN_SECRET;

class jwtHelper {
    /**
     * This module used for generate jwt token
     * @param {*} data 
     */
    generateToken = (data) => {
        return new Promise((resolve, reject) => {
            if (data.hasOwnProperty('password')) {
                delete data.password;
            }
            jwt.sign(data, JWT_ACCESS_TOKEN_SECRET,
                { expiresIn: JWT_ACCESS_TOKEN_LIFE, },
                (error, token) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(token);
                });
        })
    }
    /**
     * This module used for verify jwt token
     * @param {*} token 
     */
    verifyToken = (token) => {
        return new Promise((resolve, reject) => {
            jwt.verify(token, JWT_ACCESS_TOKEN_SECRET, (error, decoded) => {
                if (error) {
                    return reject(error);
                }
                resolve(decoded);
            });
        });
    }
}

module.exports = new jwtHelper();