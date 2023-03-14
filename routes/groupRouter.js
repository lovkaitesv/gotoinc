const Router = require('express')
const router = new Router()
const groupController = require('../controllers/groupController')
const authMiddleware = require('../middlewares/authMiddleware')

/**
 * @swagger
 * components:
 *   schemas:
 *     Group:
 *       type: object
 *       required:
 *         - text
 *         - isCompleted
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the group
 *         name:
 *           type: string
 *           description: Group name
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
 *           description: Foreign key
 *       example:
 *         id: 1
 *         name: Group
 *         createdAt: 2023-03-13T04:05:06.157Z
 *         updatedAt: 2023-03-13T05:06:07.157Z
 *         userId: 1
 *
 *   securitySchemes:
 *          bearerAuth:
 *              type: http
 *              scheme: bearer
 *              bearerFormat: JWT
 */

/**
 * @swagger
 * /group:
 *   get:
 *     summary: Get all groups for a user
 *     tags: [Group]
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
 *         description: Groups by user id
 *
 *       500:
 *         description: Internal error
 *   post:
 *     summary: Create task
 *     tags: [Group]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/Group'
 *     responses:
 *       200:
 *         description: Created task
 *       500:
 *         description: Internal error
 * /group/{id}:
 *   get:
 *     summary: Get task by id
 *     tags: [Group]
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
 *              $ref: '#/components/schemas/Group'
 *       500:
 *         description: Internal error
 *   put:
 *     summary: Update task
 *     tags: [Group]
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
 *              $ref: '#/components/schemas/Group'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Updated task
 *       500:
 *         description: Internal error
 *   delete:
 *     summary: Delete task
 *     tags: [Group]
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

router.get('/', authMiddleware, groupController.getAll)
router.get('/:id', authMiddleware, groupController.getOne)
router.post('/', authMiddleware, groupController.create)
router.put('/:id', authMiddleware, groupController.update)
router.delete('/:id', authMiddleware, groupController.delete)

module.exports = router