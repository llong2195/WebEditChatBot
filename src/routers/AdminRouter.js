const express = require('express');
const router = express.Router();
const AdminController = require('../apps/controllers/AdminController');
const AuthController = require('../apps/controllers/AuthController');
const authMiddleware = require('../apps/middlewares/authMiddleware');
const uploadMiddleware = require('../apps/middlewares/uploadMiddleware')

const validatorMiddleware = require('../apps/middlewares/validatorMiddleware')
class AdminRouter {
    init() {
        router.get("/", authMiddleware.isAuth, AdminController.index);

        router.route("/login")
            .get(authMiddleware.isLogin, AuthController.login)
            .post(authMiddleware.isLogin, validatorMiddleware.loginValidator(), AuthController.postLogin);

        router.get("/logout", AuthController.logout);

        router.get("/profile", authMiddleware.isAuth, AdminController.profile);
        router.post("/profile", authMiddleware.isAuth, uploadMiddleware.single("avatar"), AdminController.postProfile);
        router.post("/UpdateAvatar", authMiddleware.isAuth, uploadMiddleware.single("avatar"), AdminController.updateAvatar);

        router.get("/user", authMiddleware.isAuth, AdminController.user);


        router.get("/", authMiddleware.isAuth, AdminController.index);

        router.get("/", authMiddleware.isAuth, AdminController.index);

        router.get("/", authMiddleware.isAuth, AdminController.index);

        router.get("/", authMiddleware.isAuth, AdminController.index);

        router.get("/", authMiddleware.isAuth, AdminController.index);

        router.get("*", (req, res) => {
            res.render("admin/404")
        })
        return router;
    }

}

module.exports = new AdminRouter();