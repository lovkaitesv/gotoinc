const Router = require('express')
const router = new Router()
const todoController = require('../controllers/todoController')
const authMiddleware = require('../middlewares/authMiddleware')

/**
 * @swagger
 * components:
 *   schemas:
 *     Todo:
 *       type: object
 *       required:
 *         - text
 *         - isCompleted
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the task
 *         text:
 *           type: string
 *           description: Task definition
 *         isCompleted:
 *           type: boolean
 *           description: Status of the task
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The auto-generated date
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: The auto-generated date
 *         userId:
 *           type: integer
 *           description: The auto-generated foreign key
 *         groupId:
 *           type: integer
 *           description: The auto-generated foreign key, could be changed
 *       example:
 *         id: 1
 *         text: Some task
 *         isCompleted: false
 *         createdAt: 2023-03-13T04:05:06.157Z
 *         updatedAt: 2023-03-13T05:06:07.157Z
 *         userId: 1
 *         groupId: 1
 *
 *   securitySchemes:
 *          bearerAuth:
 *              type: http
 *              scheme: bearer
 *              bearerFormat: JWT
 */

/**
 * @swagger
 * /todo:
 *   get:
 *     summary: Get all tasks for a user
 *     tags: [Todo]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: integer
 *         description: Id of a user
 *         required: true
 *     responses:
 *       200:
 *         description: Tasks by user id
 *
 *       500:
 *         description: Internal error
 *   post:
 *     summary: Create task
 *     tags: [Todo]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/Todo'
 *     responses:
 *       200:
 *         description: Created task
 *       500:
 *         description: Internal error
 * /todo/{id}:
 *   get:
 *     summary: Get task by id
 *     tags: [Todo]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         description: Id of the task
 *         required: true
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Task
 *         content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/Todo'
 *       500:
 *         description: Internal error
 *   put:
 *     summary: Update task
 *     tags: [Todo]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         description: Id of the task
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/Todo'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Updated task
 *       500:
 *         description: Internal error
 *   delete:
 *     summary: Delete task
 *     tags: [Todo]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         description: Id of the task
 *         required: true
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Deleted task
 *       500:
 *         description: Internal error
 */

router.get('/', authMiddleware, todoController.getAll)
router.get('/:id', authMiddleware, todoController.getOne)
router.post('/', authMiddleware, todoController.create)
router.put('/:id', authMiddleware, todoController.update)
router.delete('/:id', authMiddleware, todoController.delete)

module.exports = router