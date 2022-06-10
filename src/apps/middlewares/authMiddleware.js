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
                console.log("decode :" , decoded);
                next();
            } catch (error) {
                return res.redirect("admin/login");
            }
        } else {
            return res.redirect("admin/login");
        }
    }
    isLogin = async (req, res, next) => {

        const tokenFromClient = req.cookies?.token || "";
        if (tokenFromClient) {
            try {
                console.log("DECODE ...");
                const decoded = await jwtHelper.verifyToken(tokenFromClient);
                console.log("decode :" , decoded);
                return res.redirect("/admin");
            } catch (error) {
                next();
            }
        } else {
            next();
        }
    }
}


module.exports = new authMiddleware();