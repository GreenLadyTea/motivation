const userService = require('../services/user-service');

class UserController {
    async registration(req, res) {
        try {
            const { login, password } = req.body;
            const userData = await userService.registration(login, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 3600 * 1000, httpOnly: true});
            return res.json(userData);
        } catch (e) {
            console.log(e);
        }
    }

    async login(req, res) {
        try {
            const { login, password } = req.body;
            const userData = await userService.login(login, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 3600 * 1000, httpOnly: true});
            return res.json(userData);
        } catch (e) {
            console.log(e);
        }
    }

    async logout(req, res) {
        try {
            const { refreshToken } = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = new UserController();
