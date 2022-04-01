const { Router } = require('express');
const auth = require('../middlewares/auth.middleware');
const goalController = require('../controllers/goal-controller');

const goalsRouter = Router();

//создание цели
goalsRouter.post('/', auth, goalController.create);

//выполнение цели?
goalsRouter.put('/:id', auth, goalController.doTheTask);

//получение всех целей
goalsRouter.get('/all', auth, goalController.getAll);

//получение целей текущего пользователя
goalsRouter.get('/', auth, goalController.getAllByUser);

//получение цели по id
goalsRouter.get('/:id', auth, goalController.getOne);

module.exports = goalsRouter;
