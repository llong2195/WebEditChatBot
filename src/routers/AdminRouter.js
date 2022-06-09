const express = require('express');
const router = express.Router();
const AdminController = require('../apps/controllers/AdminController');
const AuthController = require('../apps/controllers/AuthController');
const authMiddleware = require('../apps/middlewares/authMiddleware');

const validatorMiddleware = require('../apps/middlewares/validatorMiddleware')
class AdminRouter {
    init(){
        router.get("/", authMiddleware.isAuth , AdminController.index);
        
        router.route("/login")
                .get(authMiddleware.isLogin , AuthController.login)
                .post(authMiddleware.isLogin, validatorMiddleware.Login()  , AuthController.postLogin);
        
        router.get("/profile", authMiddleware.isAuth , AdminController.profile);

        router.get("/user", authMiddleware.isAuth , AdminController.user);
        
        router.get("/", authMiddleware.isAuth , AdminController.index);
        
        router.get("/", authMiddleware.isAuth , AdminController.index);
        
        router.get("/", authMiddleware.isAuth , AdminController.index);
        
        router.get("/", authMiddleware.isAuth , AdminController.index);
        
        router.get("/", authMiddleware.isAuth , AdminController.index);
        
        router.get("/", authMiddleware.isAuth , AdminController.index);

        router.get("*", (req, res) => {
            res.render("admin/404")
        })
        return router;
    }

}

module.exports = new AdminRouter();