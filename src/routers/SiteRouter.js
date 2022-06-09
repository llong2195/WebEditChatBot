const express = require('express');
const router = express.Router();
const SiteController = require('../apps/controllers/SiteController')

class SiteRouter {
    init(){
        router.get("/", SiteController.index)

        router.route("/contact")
            .get(SiteController.contact)
            .post(SiteController.sendMessage)

        router.get("/about", SiteController.about)
        router.get("/donate", SiteController.donate)
        router.get("/service", SiteController.service)
        return router;
    }

}

module.exports = new SiteRouter();