const GoalModel = require('../models/Goal');
const goalStatus = require('../variables/goalStatus')

class TaskManager {
  async failUnfinishedTasks(date) {
    const goals = await GoalModel.updateMany({ term: { $lt: date }, status: goalStatus.NEW }, {status: goalStatus.FAILED })
    if(goals.modifiedCount !== 0) {
      console.log('У проваленных заданий обновлен статус');
    }
  }
}

module.exports = new TaskManager();
