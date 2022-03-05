const UserModel = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

class UserController {
    async signUp(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                })
            }

            const { login, password } = req.body;
            const candidate = await UserModel.findOne({ login });
            if (candidate) {
                return res.status(400).json({ message: 'Пользователь с таким логином уже существует' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            await UserModel.create({login, password: hashedPassword});
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
                    errors: errors.array(),
                })
            }

            const { login, password } = req.body;

            const user = await UserModel.findOne({login});
            if(!user) {
                return res.status(400).json({ message: 'Пользователь не найден' });
            }

            const arePasswordsEqual = await bcrypt.compare(password, user.password);

            if (!arePasswordsEqual) {
                return res.status(400).json({ message: 'Некорректный пароль' });
            }

            const token = jwt.sign(
              { userId: user.id},
              process.env.JWT_SECRET_KEY,
              { expiresIn: '1h'}
              );

            res.json({ token, userId: user.id});
        } catch (e) {
            return res.status(500).json({ message: 'Что-то пошло не так' });
        }
    }
}

module.exports = new UserController();
