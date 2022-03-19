const { Router } = require('express');
const auth = require('../middlewares/auth.middleware');
const userController = require('../controllers/user-controller');

const usersRouter = Router();

//получение всех пользователей
usersRouter.get('/all', auth, userController.getAll);

//получение пользователя
usersRouter.get('/', auth, userController.getUser);

//получение пользователя по id
usersRouter.get('/:id', auth, userController.getUserById);

module.exports = usersRouter;
