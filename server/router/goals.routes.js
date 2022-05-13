const { Router } = require('express');
const auth = require('../middlewares/auth.middleware');
const goalController = require('../controllers/goal-controller');

const goalsRouter = Router();

//создание цели
goalsRouter.post('/', auth, goalController.create);

//обновление цели
goalsRouter.put('/:id', auth, goalController.updateGoal);

//удаление цели
goalsRouter.delete('/:id', auth, goalController.deleteGoal);

//выполнение цели
goalsRouter.put('/execute/:id', auth, goalController.doTheTask);

//подписка на цель
goalsRouter.put('/track/:id', auth, goalController.trackGoal);

//получение всех целей
goalsRouter.get('/all', auth, goalController.getAll);

//получение целей текущего пользователя
goalsRouter.get('/', auth, goalController.getAllOfAuthorizedUser);

//получение целей пользователя по username
goalsRouter.get('/:username', auth, goalController.getAllByUsername);

//получение цели по id
goalsRouter.get('/goal/:id', auth, goalController.getById);

//получение отслеживаемых целей пользователя
goalsRouter.get('/tracked/:username', auth, goalController.getTrackedByUsername);

module.exports = goalsRouter;
