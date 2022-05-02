const UserModel = require('../models/User');

class userController {
  async getAll(req, res) {
    try {
      const users = await UserModel.find().select('-__v -goals -messages -password');
      res.json(users);
    } catch(e) {
      return res.status(500).json({ message: 'Что-то пошло не так' });
    }
  }
  async getUser(req, res) {
    try {
      const user = await UserModel.findById(req.user.userId);
      res.json(user);
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
  async getUserByUsername(req, res) {
    try {
      const user = await UserModel.findOne({username: req.params.username}).select('-__v -login -messages -password');
      res.json(user);
    } catch (e) {
      return res.status(500).json({ message: 'Что-то пошло не так' });
    }
  }
}

module.exports = new userController();
