const express = require('express');
const router = express.Router();
const SiteController = require('../apps/controllers/SiteController')

class SiteRouter {
    init(){
        router.get("/", SiteController.index)
        router.get("/contact", SiteController.contact)
        router.get("/", SiteController.index)
        router.get("/", SiteController.index)
        router.get("/", SiteController.index)
        router.get("/", SiteController.index)
        router.get("/", SiteController.index)
        return router;
    }

}

module.exports = new SiteRouter();