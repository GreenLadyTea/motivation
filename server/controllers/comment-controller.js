const CommentModel = require('../models/Comment');
const GoalModel = require('../models/Goal');
const UserModel = require('../models/User');

class commentController {
  async createComment(req, res) {
    try {
      const { goalId, text } = req.body;
      const goal = await GoalModel.findById(goalId);
      const comment = await CommentModel.create({ user: req.user.userId, goal: goal._id, text });
      const user = await UserModel.findOneAndUpdate({_id: req.user.userId}, {$push: { comments : comment._id }});
      const goalUpdate = await GoalModel.findOneAndUpdate({_id: goalId}, {$push: { comments: comment._id}});
      const username = user.username;
      const title = goalUpdate.title;
      const commentText = comment.text;
      const createdAt = comment.createdAt.toLocaleString();
      return res.status(201).json({ username, title, commentText, createdAt });
    } catch (e) {
      return res.status(500).json({ message: 'Что-то пошло не так' });
    }
  }
  async getAllByGoal(req, res) {
    try {
      const comments = await CommentModel.find({ goal: req.params.id });
      return res.status(200).json(comments);
    } catch (e) {
      return res.status(500).json({ message: 'Что-то пошло не так' });
    }
  }
}

module.exports = new commentController();
