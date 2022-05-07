const Router = require('express').Router;
const auth = require('../middlewares/auth.middleware');
const commentController = require('../controllers/comment-controller');

const commentsRouter = new Router();

//создание комментария
commentsRouter.post('/', auth, commentController.createComment);

//получение всех комментариев по id цели
commentsRouter.get('/:id', auth, commentController.getAllByGoal);

module.exports = commentsRouter;
