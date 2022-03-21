const UserModel = require('../models/User');

class userController {
  async getAll(req, res) {
    try {
      const users = await UserModel.find();
      res.json(users);
    } catch(e) {
      return res.status(500).json({ message: 'Что-то пошло не так' });
    }
  }
  async getUser(req, res) {
    try {
      const user = await UserModel.findById(req.user.userId);
      const { login } = user;
      res.json(login);
    } catch (e) {
      return res.status(500).json({ message: 'Что-то пошло не так' });
    }
  }
  async getUserById(req, res) {
    try {
      const user = await UserModel.findById(req.params.id);
      res.json(user);
    } catch (e) {
      return res.status(500).json({ message: 'Что-то пошло не так' });
    }
  }
}

module.exports = new userController();
