const { Router } = require('express');
const auth = require('../middlewares/auth.middleware');
const userController = require('../controllers/user-controller');

const usersRouter = Router();

//получение всех пользователей
usersRouter.get('/all', auth, userController.getAll);

//получение текущего пользователя
usersRouter.get('/', auth, userController.getUser);

//обновление описания пользователя
usersRouter.post('/description', auth, userController.updateUserDescription);

//обновление имени пользователя
usersRouter.post('/username', auth, userController.updateUserName);

//получение пользователя по username
usersRouter.get('/:username', auth, userController.getUserByUsername);

module.exports = usersRouter;
