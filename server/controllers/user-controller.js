const UserModel = require('../models/User');
const GoalModel = require('../models/Goal');

class userController {
  async getAll(req, res) {
    try {
      const users = await UserModel.find().select('-__v -goals -trackedGoals -comments -password -login -description');
      res.json(users);
    } catch(e) {
      return res.status(500).json({ message: 'Что-то пошло не так' });
    }
  }
  async getUser(req, res) {
    try {
      const user = await UserModel.findOne({_id: req.user.userId }).select('-__v -password -login -goals -trackedGoals -comments');
      return res.status(200).json(user);
    } catch (e) {
      return res.status(500).json({ message: 'Что-то пошло не так' });
    }
  }
  async updateUserDescription(req, res) {
    try {
      const { description } = req.body;
      const user = await UserModel.findOneAndUpdate({ _id: req.user.userId }, { description: description}, {
        new: true
      });
      const desc = user.description;
      return res.status(200).json({ desc });
    } catch(e) {
      return res.status(500).json({ message: 'Что-то пошло не так' });
    }
  }
  async updateUserName(req, res) {
    try {
      const { username } = req.body;
      const candidate = await UserModel.findOne({ username });
      if (candidate) {
        return res.status(400).json({ message: `Пользователь с именем ${username} уже существует!`})
      }
      const user = await UserModel.findOneAndUpdate({ _id: req.user.userId }, { username: username }, {
        new: true
      });
      const nick = user.username;
      return res.status(200).json({ nick });
    } catch(e) {
      return res.status(500).json({ message: 'Что-то пошло не так' });
    }
  }
  async getUserByUsername(req, res) {
    try {
      const user = await UserModel.findOne({username: req.params.username}).select('-__v -login -comments -password');
      return res.status(200).json(user);
    } catch (e) {
      return res.status(500).json({ message: 'Что-то пошло не так' });
    }
  }
  async getAllSubscribersByGoal(req, res) {
    try {
      const goal = await GoalModel.findById(req.params.id).select('-updatedAt -__v');
      const subscribers_array = [];
      for (let i = 0; i < goal.subscribers.length; i++) {
        const user = await UserModel.findById(goal.subscribers[i]);
        subscribers_array.push({
          _id: user._id,
          username: user.username,
          avatar: user.avatar
        });
      }
      return res.status(200).json(subscribers_array);
    } catch (e) {
      return res.status(500).json({ message: 'Что-то пошло не так' });
    }
  }
}

module.exports = new userController();
