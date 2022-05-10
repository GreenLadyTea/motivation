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
      const createdAt = comment.createdAt.toLocaleString().slice(0,17);
      return res.status(201).json({ username, title, commentText, createdAt });
    } catch (e) {
      return res.status(500).json({ message: 'Что-то пошло не так' });
    }
  }
  async getAllByGoal(req, res) {
    try {
      const comments = await CommentModel.find({ goal: req.params.id }).select('-updatedAt -__v');
      const comm_array = [];
      for (let i = 0; i < comments.length; i++) {
        const user = await UserModel.findById(comments[i].user);
        comm_array[i] = {
          id: comments[i]._id,
          username: user.username,
          text: comments[i].text,
          createdAt: comments[i].createdAt.toLocaleString().slice(0,17)
        }
      }
      return res.status(200).json(comm_array);
    } catch (e) {
      return res.status(500).json({ message: 'Что-то пошло не так' });
    }
  }
}

module.exports = new commentController();
