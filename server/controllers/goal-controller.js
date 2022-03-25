const GoalModel = require('../models/Goal');

class GoalController {
  async create(req, res) {
    try {
      const { title, description, term } = req.body;
      const goal = await GoalModel.create({ user: req.user.userId, title, description, term, status: 'new' });
      return res.status(201).json({ goal });
    } catch (e) {
      return res.status(500).json({ message: 'Что-то пошло не так' });
    }
  }
  async getAll(req, res) {
    try {
      const goals = await GoalModel.find().select('-__v -subscribers');
      return res.status(200).json(goals);
    } catch(e) {
      return res.status(500).json({ message: 'Что-то пошло не так' });
    }
  }
  async getAllByUser(req, res) {
    try {
      const goals = await GoalModel.find({ user: req.user.userId }).select('-__v -subscribers');
      return res.status(200).json(goals);
    } catch (e) {
      return res.status(500).json({ message: 'Что-то пошло не так' });
    }
  }
  async getOne(req, res) {
    try {
      const goal = await GoalModel.findById(req.params.id);
      return res.status(200).json(goal);
    } catch (e) {
      return res.status(500).json({ message: 'Что-то пошло не так' });
    }
  }
}

module.exports = new GoalController();
