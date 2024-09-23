const { Router } = require('express');
const postRouter = Router();
const postController = require('../controllers/postController');    
const { passport } = require('../config/passport');

postRouter.get('/', postController.getAllPosts);
postRouter.post('/', passport.authenticate('jwt', {session: false}), postController.createPost);

postRouter.post('/:postId/like', passport.authenticate('jwt', {session: false}), postController.likePost);
postRouter.delete('/:postId/like', passport.authenticate('jwt', {session: false}), postController.unlikePost);

module.exports = postRouter;