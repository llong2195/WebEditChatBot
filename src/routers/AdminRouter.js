const express = require('express');
const router = express.Router();
const AdminController = require('../apps/controllers/AdminController')

class AdminRouter {
    init(){
        router.get("/", AdminController.index)
        return router;
    }

}

module.exports = new AdminRouter();