const Router = require('express').Router;
const auth = require('../middlewares/auth.middleware');
const authController = require('../controllers/auth-controller');

const authRouter = new Router();

//регистрация
authRouter.post('/sign-up', authController.signUp);

//вход
authRouter.post('/sign-in', authController.signIn);

//проверка авторизации
authRouter.get('/check-auth', auth, authController.checkAuth);

module.exports = authRouter;
