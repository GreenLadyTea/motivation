const userService = require('../services/user-service');

class UserController {
    async registration(req, res, next) {
        try {
            const { login, password } = req.body;
            const userData = await userService.registration(login, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 3600 * 1000, httpOnly: true});
            return res.json(userData);
        } catch (e) {
            console.log(e);
        }
    }

    async login(req, res, next) {
        try {

        } catch (e) {

        }
    }

    async logout(req, res, next) {
        try {

        } catch (e) {

        }
    }

    async refresh(req, res, next) {
        try {

        } catch (e) {

        }
    }

    async getUsers(req, res, next) {
        try {
            res.json(['123', '456'])
        } catch (e) {

        }
    }
}

module.exports = new UserController();
