const router = require('express').Router();
const chatModel = require('../models/chatModel');
const chatController = require("../controllers/chatControllers")

router.post('/',chatController.createChat );

router.get('/:id',chatController.loadChat );

router.post("/summary/bulk", chatController.getChatSummary);

module.exports = router;