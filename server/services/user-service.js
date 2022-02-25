const UserModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');

class UserService {
    async registration(login, password) {
        const candidate = await UserModel.findOne({login});
        if (candidate) {
            throw new Error(`Пользователь с логином ${login} существует`);
        }
        const hashPassword = await bcrypt.hash(password, 3);
        const user = await UserModel.create({login, password: hashPassword});

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        }
    }

    async login(login, password) {
        const user = await UserModel.findOne({login});
        if(!user) {
            throw new Error(`Пользователь с логином ${login} не зарегистрирован`);
        }
        const arePasswordsEqual = await bcrypt.compare(password, user.password)
        if (!arePasswordsEqual) {
            throw new Error ('Некорректный пароль');
        }
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        }
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }
}

module.exports = new UserService();
