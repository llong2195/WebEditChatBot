
const jwt = require("jsonwebtoken");
const config = require("config");
const SECRET_KEY = config.get("app").JWT_ACCESS_TOKEN_SECRET || "llong";
const TOKEN_LIFE = config.get("app").JWT_ACCESS_TOKEN_LIFE || "10m";
class AuthServier {
    /**
     * generate jwt token
     * @param user 
     */
    generateToken = (user) => {
        return new Promise((resolve, reject) => {

            // Thực hiện ký và tạo token
            jwt.sign(
                {
                    data: user
                },
                secret,
                {
                    algorithm: "HS256",
                    expiresIn: TOKEN_LIFE,
                },
                (error, token) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(token);
                });
        });
    }


    /**
     * verify jwt token
     * @param {*} token 
     */
    verifyToken = (token) => {
        return new Promise((resolve, reject) => {
            jwt.verify(token, SECRET_KEY, (error, decoded) => {
                if (error) {
                    return reject(error);
                }
                resolve(decoded);
            });
        });
    }
}


module.exports = new AuthServier();