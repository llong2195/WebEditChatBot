const express = require('express');
const router = express.Router();
const AdminController = require('../apps/controllers/AdminController');
const AuthController = require('../apps/controllers/AuthController');
const IntentController = require('../apps/controllers/IntentController');
const UserController = require('../apps/controllers/UserController');
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

        // --------------------- USER ----------------
        router.get("/user", authMiddleware.isAuth, authMiddleware.isAdmin, UserController.index);
        router.get("/user/create", authMiddleware.isAuth, authMiddleware.isAdmin, UserController.create);
        router.post("/user/create", authMiddleware.isAuth, authMiddleware.isAdmin, uploadMiddleware.single("avatar"), UserController.store);
        router.get("/user/edit/:id", authMiddleware.isAuth, authMiddleware.isAdmin, UserController.edit);
        router.post("/user/edit/:id", authMiddleware.isAuth, authMiddleware.isAdmin, UserController.update);
        router.get("/user/delete/:id", authMiddleware.isAuth, authMiddleware.isAdmin, UserController.delete);

        // --------------------- INTENT ----------------
        router.get("/intent", authMiddleware.isAuth, IntentController.index);
        router.get("/intent/create", authMiddleware.isAuth, IntentController.create);
        router.post("/intent/create", authMiddleware.isAuth, IntentController.store);
        router.get("/intent/edit/:id", authMiddleware.isAuth, IntentController.edit);
        router.post("/intent/edit/:id", authMiddleware.isAuth, IntentController.update);
        router.get("/intent/delete/:id", authMiddleware.isAuth, IntentController.delete);
        
        router.get("/intent", authMiddleware.isAuth, AdminController.index);

        router.get("/intent", authMiddleware.isAuth, AdminController.index);

        router.get("/intent", authMiddleware.isAuth, AdminController.index);

        router.get("/intent", authMiddleware.isAuth, AdminController.index);

        router.get("*", (req, res) => {
            res.render("admin/404")
        })
        return router;
    }

}

module.exports = new AdminRouter();