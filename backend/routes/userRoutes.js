const { Router } = require('express');
const userRouter = Router();
const userController = require('../controllers/userController');

userRouter.get('/', userController.getUsers);
userRouter.get('/:id', userController.getUser);

module.exports = userRouter;
