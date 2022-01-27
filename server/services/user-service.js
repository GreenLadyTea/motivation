const UserModel = require('../models/user-model');
const bcrypt = require('bcrypt');

class UserService {
    async registration(login, password) {
        const candidate = await UserModel.findOne({login});
        if (candidate) {
            throw new Error(`Пользователь с логином ${login} существует`);
        }
        const hashPassword = await bcrypt.hash(password, 3);
        const user = await UserModel.create({login, password: hashPassword});
    }
}

module.exports = new UserService();
