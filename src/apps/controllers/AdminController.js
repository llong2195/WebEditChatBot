const jwtHelper = require("../helper/jwtHelper");
const userModel = require("../models/userModel");
const fs = require('fs');
const path = require('path');
/**
* @param {*} req : Request
* @param {*} res : Response
*/
class AdminController {
    // [GET] /admin
    index(req, res) {

        return res.render('admin/index', {
            title: 'Trang Chủ Quản Trị'
        })
    }
    // [GET] /admin/profile
    async profile(req, res) {
        const tokenFromClient = req.cookies?.token || "";
        if (tokenFromClient) {
            try {
                const decoded = await jwtHelper.verifyToken(tokenFromClient);
                if(decoded) {
                    const user = await userModel.findById(decoded.data._id);
                    if(user) {
                        return res.render("admin/profile", {
                            title: "Thông Tin Tài Khoản",
                            user : user
                        })
                    }

                }else{
                    return res.redirect("admin/login");
                }
            } catch (error) {
                res.cookie("token", "",{
                    maxAge:1
                })
                return res.redirect("admin/login");
            }
        }
    }
    // [POST] /admin/profile
    async postProfile(req, res) {
        try {
            const tokenFromClient = req.cookies?.token || "";
            const decode = await jwtHelper.verifyToken(tokenFromClient);
            const idUser = decode.data._id;
            const updateUser = {
                email : req.body.email,
                first_name : req.body.first_name,
                last_name : req.body.last_name,
                gender : req.body.gender,
                address : req.body.address,
                phone_number : req.body.phone_number,
                role : req.body.role
            }
            await userModel.findOneAndUpdate({_id : idUser}, {$set : updateUser})
            
            return res.redirect('/admin/profile');
        } catch (error) {
            
        }
    }
    // [POST] /admin/UpdateAvatar
    async updateAvatar(req, res) {
        try {
            const tokenFromClient = req.cookies?.token || "";
            const decode = await jwtHelper.verifyToken(tokenFromClient);
            const idUser = decode.data._id;
            const file = req.file;
            
            if(file){
                const thumbnail = "users/"+file.filename;
                console.log(file);
                fs.renameSync(file.path, path.resolve("src/public/images", thumbnail));
                await userModel.findOneAndUpdate({_id : idUser}, {$set : {"avatar": thumbnail}});
            }
            return res.redirect('/admin/profile');
        } catch (error) {
            return res.redirect('/admin/profile');
        }
    }
    user(req, res) {
        return res.render('admin/index', {
            title: 'Trang Chủ Quản Trị'
        })
    }
    role(req, res) {

        return res.render('admin/index', {
            title: 'Trang Chủ Quản Trị'
        })
    }
    
}

module.exports = new AdminController();