const { validationResult } = require('express-validator');
const userModel = require('./../models/userModel');
const jwtHelper = require('./../helper/jwtHelper')
class AuthController {
    // [GET] /admin/login
    async login(req, res) {
        return res.render('admin/login', {
            title: 'Đăng Nhập',
            error : null,
        })
    }
    // [POST] /admin/login
    async postLogin(req, res) {

        try {
            const { email, password } = req.body;
            console.log(req.body);
            const validatorErr = validationResult(req);
            if (!validatorErr.isEmpty()) {
                const extractedErrors = {}
                validatorErr.array().map(err => extractedErrors[err.param] = err.msg)
                
                return res.render("admin/login", {
                    title: "Đăng Nhập",
                    error: extractedErrors
                });
            }else{
                const user = await userModel.login(email, password);
                // console.log(user);
                if(user){
                    // console.log("user ok ");
                    const token = await jwtHelper.generateToken(user);
                    // console.log(token);
                    if(token){
                        res.cookie("token", token,{
                            httpOnly: true
                        });
                        return res.redirect("/admin");
                    }
                    
                }
            }
        } catch (error) {
            return res.render("admin/login", {
                title: "Đăng Nhập",
                error : null,
            });
        }

        return res.render('admin/login', {
            title: 'Đăng Nhập',
            error : null,
        })
    }
    
    logout(req, res) {
        console.log("logout ....");
        res.cookie("token", "",{
            httpOnly: true,
            maxAge: 1
        });
        console.log("logout oke");
        return res.redirect('/admin/login');
    }
}

module.exports = new AuthController();