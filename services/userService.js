const {User} = require("../models/models")
const bcrypt = require("bcrypt")
const UserDto = require("../dtos/userDto")
const tokenService = require('./tokenService')
const ApiError = require("../exceptions/ApiError")

class UserService {
    async registration(username, password) {
        const candidate = await User.findOne({where: {username}})
        if (candidate) {
            throw ApiError.BadRequest('User already exists')
        }
        const hash = await bcrypt.hash(password, 6)
        const user = await User.create({
            username,
            password: hash
        })
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {...tokens, user: userDto}
    }

    async login(username, password) {
            const user = await User.findOne({where: {username}})
            if (!user) {
                throw ApiError.BadRequest('Wrong username or password')
            }
            const isPassEqual = await bcrypt.compare(password, user.password)
            if (!isPassEqual) {
                throw ApiError.BadRequest('Wrong username or password')
            }
            const userDto = new UserDto(user)
            const tokens = tokenService.generateTokens({...userDto})

            await tokenService.saveToken(userDto.id, tokens.refreshToken)
            return {...tokens, user: userDto}
    }

    async logout(refreshToken) {
            const token = await tokenService.removeToken(refreshToken)
            return token
    }

    async refresh(refreshToken) {
            if(!refreshToken) {
                throw ApiError.UnauthorizedError()
            }
            const userData = tokenService.validateRefreshToken(refreshToken)
            const tokenDb = await tokenService.findToken(refreshToken)
            if (!userData || !tokenDb) {
                throw ApiError.UnauthorizedError()
            }
            const user = await User.findOne({where: {id: userData.id}})
            const userDto = new UserDto(user)
            const tokens = tokenService.generateTokens({...userDto})

            await tokenService.saveToken(userDto.id, tokens.refreshToken)
            return {...tokens, user: userDto}
    }
}

module.exports = new UserService()