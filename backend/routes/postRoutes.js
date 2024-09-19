const { Router } = require('express');
const postRouter = Router();
const postController = require('../controllers/postController');    

postRouter.get('/', postController.getAllPosts);

module.exports = postRouter;