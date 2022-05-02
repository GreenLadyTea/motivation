const { Router } = require('express');
const auth = require('../middlewares/auth.middleware');
const goalController = require('../controllers/goal-controller');

const goalsRouter = Router();

//создание цели
goalsRouter.post('/', auth, goalController.create);

//выполнение цели
goalsRouter.put('/:id', auth, goalController.doTheTask);

//подписка на цель
goalsRouter.put('/track/:id', auth, goalController.trackGoal);

//получение всех целей
goalsRouter.get('/all', auth, goalController.getAll);

//получение целей текущего пользователя
goalsRouter.get('/', auth, goalController.getAllOfAuthorizedUser);

//получение целей пользователя по username
goalsRouter.get('/:username', auth, goalController.getAllByUsername);

module.exports = goalsRouter;
