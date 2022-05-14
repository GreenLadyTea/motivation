const GoalModel = require('../models/Goal');
const UserModel = require('../models/User');

const GOAL_STATUS = {
  NEW: 'new',
  WAITING: 'waiting',
  SUCCESS: 'success',
  FAILED: 'failed'
}

class GoalController {
  async create(req, res) {
    try {
      const { title, description, term } = req.body;
      const goal = await GoalModel.create({ user: req.user.userId, title, description, term, status: GOAL_STATUS.NEW });
      const user = await UserModel.findOneAndUpdate({_id: req.user.userId}, {$push: { goals : goal._id }});
      const goal_title = goal.title;
      const user_name = user.username;
      return res.status(201).json({ goal_title, user_name });
    } catch (e) {
      return res.status(500).json({ message: 'Поля должны быть заполнены' });
    }
  }

  async updateGoal(req, res) {
    try {
      const { title, description, term } = req.body;
      const goal = await GoalModel.findOneAndUpdate({ _id: req.params.id, user: req.user.userId }, { title: title, description: description, term: term}, {
        new: true
      });
      return res.status(200).json(goal);
    } catch (e) {
      return res.status(500).json({ message: 'Что-то пошло не так' });
    }
  }

  async deleteGoal(req, res) {
    try {

    } catch (e) {
      return res.status(500).json({ message: 'Что-то пошло не так' });
    }
  }

  async doTheTask(req, res) {
    try {
      const goal = await GoalModel.findOneAndUpdate({ _id: req.params.id, user: req.user.userId }, { status: GOAL_STATUS.WAITING}, {
        new: true
      });
      return res.status(200).json(goal);
    } catch(e) {
      return res.status(500).json({ message: 'Что-то пошло не так' });
    }
  }

  async getAll(req, res) {
    try {
      const goals = await GoalModel.find({ status: GOAL_STATUS.NEW }).select('-__v -subscribers -updatedAt');
      const goals_array = [];
      for (let i = 0; i < goals.length; i++) {
        const user = await UserModel.findById(goals[i].user);
        goals_array.push({
          _id: goals[i]._id,
          userId: goals[i].user,
          username: user.username,
          title: goals[i].title,
          status: goals[i].status,
          description: goals[i].description,
          term: goals[i].term,
          createdAt: goals[i].createdAt
        });
      }
      return res.status(200).json(goals_array);
    } catch(e) {
      return res.status(500).json({ message: 'Что-то пошло не так' });
    }
  }

  async getAllNewOfAuthorizedUser(req, res) {
    try {
      const goals = await GoalModel.find({ user: req.user.userId, status: GOAL_STATUS.NEW }).select('-__v -subscribers');
      let goals_array = [];
      for (let i = 0; i < goals.length; i++) {
        goals_array[i] = {
          _id: goals[i]._id,
          userId: goals[i].user,
          title: goals[i].title,
          description: goals[i].description,
          status: goals[i].status,
          term: goals[i].term,
          createdAt: goals[i].createdAt
        }
      }
      return res.status(200).json(goals_array);
    } catch (e) {
      return res.status(500).json({ message: 'Что-то пошло не так' });
    }
  }

  async getAllSucceedOfAuthorizedUser(req, res) {
    try {
      const goals = await GoalModel.find({ user: req.user.userId, status: GOAL_STATUS.SUCCESS }).select('-__v -subscribers -updatedAt');
      let goals_array = [];
      for (let i = 0; i < goals.length; i++) {
        goals_array[i] = {
          _id: goals[i]._id,
          userId: goals[i].user,
          title: goals[i].title,
          description: goals[i].description,
          status: goals[i].status,
          term: goals[i].term,
          createdAt: goals[i].createdAt
        }
      }
      return res.status(200).json(goals_array);
    } catch (e) {
      return res.status(500).json({ message: 'Что-то пошло не так' });
    }
  }

  async getAllByUsername(req, res) {
    try {
      const user = await UserModel.findOne({ username: req.params.username });
      const goals = await GoalModel.find({ user: user._id }).select('-__v -subscribers -updatedAt');
      return res.status(200).json(goals);
    } catch (e) {
      return res.status(500).json({ message: 'Что-то пошло не так' });
    }
  }

  async trackGoal(req, res) {
    try {
      const goal = await GoalModel.findOneAndUpdate({ _id: req.params.id}, { $push: { subscribers: req.user.userId } });
      const user = await UserModel.findByIdAndUpdate(req.user.userId, { $push: { trackedGoals: req.params.id } });
      return res.status(200).json({
        goal: goal,
        user: user
      });
    } catch (e) {
      return res.status(500).json({ message: 'Что-то пошло не так' });
    }
  }

  async getTrackedByUsername(req, res) {
    try {
      const user = await UserModel.findOne({ username: req.params.username });
      const goals_array = [];
      for (let i = 0; i < user.trackedGoals.length; i++) {
        const goal = await GoalModel.findById(user.trackedGoals[i]).select('-__v -subscribers -updatedAt');
        goals_array.push(goal);
      }
      return res.status(200).json(goals_array);
    } catch(e) {
      return res.status(500).json({ message: 'Что-то пошло не так' });
    }
  }

  async getById(req, res) {
    try {
      const goal = await GoalModel.findById(req.params.id);
      const user = await UserModel.findById(goal.user);
      const result = {
        _id: goal._id,
        title: goal.title,
        username: user.username,
        description: goal.description,
        term: goal.term,
        status: goal.status,
        createdAt: goal.createdAt
      };
      return res.status(200).json(result);
    } catch (e) {
      return res.status(500).json({ message: 'Что-то пошло не так' });
    }
  }
}

module.exports = new GoalController();
