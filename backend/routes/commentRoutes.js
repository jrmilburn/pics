const { Router } = require('express');
const commentRouter = Router();
const commentController = require('../controllers/commentController');

commentRouter.post('/', commentController.createComment);

module.exports = commentRouter;