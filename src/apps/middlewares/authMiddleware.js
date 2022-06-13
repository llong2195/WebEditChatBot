const config = require('config');
const jwtHelper = require('./../helper/jwtHelper');

/**
* Middleware: Authorization user by Token
* @param {*} req 
* @param {*} res 
* @param {*} next 
*/
class authMiddleware {

    isAuth = async (req, res, next) => {

        const tokenFromClient = req.cookies?.token || "";
        if (tokenFromClient) {
            try {
                console.log("DECODE ....");
                const decoded = await jwtHelper.verifyToken(tokenFromClient);
                console.log("decode :", decoded);
                next();
            } catch (error) {
                res.cookie("token", "", {
                    maxAge: 1
                })
                return res.redirect("admin/login");
            }
        } else {
            res.cookie("token", "", {
                maxAge: 1
            })
            return res.redirect("admin/login");
        }
    }
    isLogin = async (req, res, next) => {

        const tokenFromClient = req.cookies?.token || "";
        if (tokenFromClient) {
            try {
                const decoded = await jwtHelper.verifyToken(tokenFromClient);
                if (decoded) {
                    return res.redirect("/admin");
                }
            } catch (error) {
                return res.redirect("admin/login");
            }
        } else {
            next();
        }
    }
}


module.exports = new authMiddleware();