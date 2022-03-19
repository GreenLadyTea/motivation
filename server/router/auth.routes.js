const Router = require('express').Router;
const userController = require('../controllers/user-controller');
const { check } = require('express-validator');

const authRouter = new Router();

//регистрация
authRouter.post('/sign-up',
  [
    check('login', 'Пустое поле логина').notEmpty(),
    check('password', 'Минимальная длина пароля 6 символов').isLength({min: 6})
  ],
  userController.signUp);

//вход
authRouter.post('/sign-in',
  [
    check('login', 'Пустое поле логина').notEmpty(),
    check('password', 'Пароль не введен').notEmpty()
  ],
  userController.signIn);

module.exports = authRouter;