const UserModel = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

class AuthController {
    async signUp(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    message: errors.array(),
                })
            }

            const { login, password, fio } = req.body;
            const candidate = await UserModel.findOne({ login });
            if (candidate) {
                return res.status(400).json({ message: `Пользователь с логином ${login} уже существует` });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            await UserModel.create({login, password: hashedPassword, fio });
            res.status(201).json({ message: 'Пользователь успешно зарегистрирован' });
        } catch (e) {
            return res.status(500).json({ message: 'Что-то пошло не так' });
        }
    }

    async signIn(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    message: errors.array(),
                })
            }

            const { login, password } = req.body;

            const user = await UserModel.findOne({login});
            if(!user) {
                return res.status(404).json({ message: 'Пользователь не найден' });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return res.status(400).json({ message: 'Некорректный пароль' });
            }

            const token = jwt.sign(
              { userId: user.id},
              process.env.JWT_SECRET_KEY,
              { expiresIn: '2h'}
              );

            res.status(200).json({ token });
        } catch (e) {
            return res.status(500).json({ message: 'Что-то пошло не так' });
        }
    }
}

module.exports = new AuthController();
