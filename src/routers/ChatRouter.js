const express = require('express');
const router = express.Router();
const SiteController = require('../apps/controllers/SiteController')

class ChatRouter {
    init(){
        router.get("/", SiteController.index)
        return router;
    }
}

module.exports = new ChatRouter();