const { Router } = require('express');
const auth = require('../middlewares/auth.middleware');
const goalController = require('../controllers/goal-controller');

const goalsRouter = Router();

//создание цели
goalsRouter.post('/', auth, goalController.create);

//обновление цели
goalsRouter.put('/:id', auth, goalController.updateGoal);

//удаление цели
goalsRouter.delete('/:id', goalController.deleteGoal);

//выполнение цели
goalsRouter.put('/execute/:id', auth, goalController.doTheTask);

//подписка на цель
goalsRouter.put('/track/:id', auth, goalController.trackGoal);

//подтверждение цели
goalsRouter.put('/approve/:id', auth, goalController.approveGoal);

//получение всех целей по дате создания
goalsRouter.get('/allByCreation', auth, goalController.getAllByCreation);

//получение всех целей по сроку выполнения
goalsRouter.get('/allByTerm', auth, goalController.getAllByTerm);

//получение целей текущего пользователя в зависимости от статуса их выполнения
goalsRouter.get('/current/:status', auth, goalController.getAllOfAuthorizedUser);

//получение целей пользователя по username
goalsRouter.get('/:username', auth, goalController.getAllByUsername);

//получение цели по id
goalsRouter.get('/goal/:id', auth, goalController.getById);

//получение отслеживаемых целей пользователя
goalsRouter.get('/tracked/:username', auth, goalController.getTrackedByUsername);

module.exports = goalsRouter;
