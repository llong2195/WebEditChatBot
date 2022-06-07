const express = require("express");
const router = express.Router();

const SiteRouter = require("./SiteRouter");
const AdminRouter = require("./AdminRouter");
const ChatRouter = require("./ChatRouter");


// --------------------- SITE ----------------------------------

router.use('/', SiteRouter.init());

// --------------------- ADMIN --------------------------------

router.use('/admin', AdminRouter.init());

// --------------------- CHAT --------------------------------

router.use('/chat', ChatRouter.init());


module.exports = router;