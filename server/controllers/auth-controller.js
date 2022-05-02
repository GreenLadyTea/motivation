const UserModel = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthController {
    async signUp(req, res) {
        try {
            const { login, password, username } = req.body;
            const candidate = await UserModel.findOne({ login });
            if (candidate) {
                return res.status(400).json({ message: `Пользователь с логином ${login} уже существует` });
            }
            const pretender = await UserModel.findOne({ username });
            if (pretender) {
                return res.status(400).json({ message: `Пользователь с именем ${username} уже существует` });
            }
            const hashedPassword = await bcrypt.hash(password, 6);
            await UserModel.create({login, password: hashedPassword, username, description: "", avatar: "" });
            return res.status(201).json({ message: 'Пользователь успешно зарегистрирован' });
        } catch (e) {
            return res.status(500).json({ message: 'Что-то пошло не так' });
        }
    }

    async signIn(req, res) {
        try {
            const { login, password } = req.body;

            const user = await UserModel.findOne({login});
            if(!user) {
                return res.status(404).json({ message: `Пользователь с логином ${login} не зарегистрирован` });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return res.status(400).json({ message: 'Неправильный пароль' });
            }

            const token = jwt.sign(
              { userId: user._id},
              process.env.JWT_SECRET_KEY,
              { expiresIn: '2h'}
              );

            return res.status(200).json({
                token,
                user: {
                    id: user._id,
                    login: user.login,
                    username: user.username
                }
            });
        } catch (e) {
            return res.status(500).json({ message: 'Что-то пошло не так' });
        }
    }
    async checkAuth(req, res) {
        try {
            const user = await UserModel.findOne({ _id: req.user.userId });
            const token = jwt.sign(
              { userId: user._id},
              process.env.JWT_SECRET_KEY,
              { expiresIn: '2h'}
            );
            return res.status(200).json({
                token,
                user: {
                    login: user.login,
                    username: user.username
                }
            });
        } catch (e) {
            return res.status(500).json({ message: 'Что-то пошло не так' });
        }
    }
}

module.exports = new AuthController();
