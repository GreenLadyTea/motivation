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
      return res.status(201).json({ goal });
    } catch (e) {
      return res.status(500).json({ message: 'Поля должны быть заполнены' });
    }
  }

  async doTheTask(req, res) {
    try {
      const goal = await GoalModel.findOneAndUpdate({ _id: req.params.id, user: req.user.userId }, { status: GOAL_STATUS.WAITING}, {
        new: true
      });
      return res.status(200).json({ goal });
    } catch(e) {
      return res.status(500).json({ message: 'Что-то пошло не так' });
    }
  }

  async getAll(req, res) {
    try {
      const goals = await GoalModel.find().select('-__v -subscribers -updatedAt');
      const goals_array = [];
      for (let i = 0; i < goals.length; i++) {
        const user = await UserModel.findById(goals[i].user);
        goals_array[i] = {
          id: goals[i]._id,
          userId: goals[i].user,
          username: user.username,
          title: goals[i].title,
          description: goals[i].description,
          term: goals[i].term,
          createdAt: goals[i].createdAt
        }
      }
      return res.status(200).json(goals_array);
    } catch(e) {
      return res.status(500).json({ message: 'Что-то пошло не так' });
    }
  }

  async getAllOfAuthorizedUser(req, res) {
    try {
      const goals = await GoalModel.find({ user: req.user.userId }).select('-__v -subscribers');
      return res.status(200).json(goals);
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
}

module.exports = new GoalController();
