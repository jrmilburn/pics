const { Router } = require('express');
const followerController = require('../controllers/followerController');

const followRouter = Router();

followRouter.get('/', followerController.getNotFollowing);

module.exports = followRouter;