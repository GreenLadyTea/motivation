const Router = require('express').Router;
const userController = require('../controllers/user-controller');

const router = new Router();

const { body } = require('express-validator');

router.post('/registration',
    body('login').notEmpty(),
    body('password').isLength({min: 4, max: 24}),
    userController.registration);
router.post('/login', userController.login);
router.post('/logout', userController.logout);

router.get('/refresh', userController.refresh);
router.get('/users', userController.getUsers);

module.exports = router;
