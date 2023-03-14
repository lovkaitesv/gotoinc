const userService = require('../services/userService')

class UserController {
    async registration(req, res, next) {
        try {
            const {username, password} = req.body
            await userService.registration(username, password)
            return res.status(200).send({message: 'Registration successful'})
        } catch (e) {
            next(e)
        }
    }

    async login(req, res, next) {
        try {
            const {username, password} = req.body
            const user = await userService.login(username, password)
            res.cookie('refreshToken', user.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.status(200).json(user)
        } catch (e) {
            next(e)
        }
    }

    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies
            await userService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.status(200).send({message: 'You are logged out!'})
        } catch (e) {
            next(e)
        }
    }

    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies
            const user = await userService.refresh(refreshToken)
            res.cookie('refreshToken', user.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.status(200).json(user)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new UserController()