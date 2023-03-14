const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         username:
 *           type: string
 *           description: Username
 *         password:
 *           type: string
 *           description: Password
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The auto-generated date
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: The auto-generated date
 *       example:
 *         id: 1
 *         username: Username
 *         password: password
 *         createdAt: 2023-03-13T04:05:06.157Z
 *         updatedAt: 2023-03-13T05:06:07.157Z
 */

/**
 * @swagger
 * /user/registration:
 *   post:
 *     summary: Registration
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Registered user
 *
 *       400:
 *         description: User already exists
 * /user/login:
 *   post:
 *     summary: Login
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Logged in user
 *         content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal error
 * /user/logout:
 *   post:
 *     summary: Logout
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Logget out user
 *       500:
 *         description: Internal error
 * /user/refresh:
 *   get:
 *     summary: Refreshing token
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Token refreshed
 *       500:
 *         description: Internal error
 */
router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/refresh', userController.refresh)

module.exports = router