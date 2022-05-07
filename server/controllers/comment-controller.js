const CommentModel = require('../models/Comment');
const GoalModel = require('../models/Goal');

class commentController {
  async createComment(req, res) {
    try {
      const { goalId, text } = req.body;
      const goal = await GoalModel.findById(goalId);
      const comment = await CommentModel.create({ user: req.user.userId, goal: goal._id, text });
      return res.status(201).json({ comment });
    } catch (e) {
      return res.status(500).json({ message: 'Что-то пошло не так' });
    }
  }
}

module.exports = new commentController();
