const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/comments.controller');


router.post("/", commentsController.addComment);
router.post("/reply/", commentsController.addReply);
router.get("/", commentsController.getComments);

module.exports = router;
