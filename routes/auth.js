const { Router } = require('express')
const { signIn, signUp, loggout } = require('../controllers/auth')


/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - emailAddress
 *         - password 
 *       properties:
 *          emailAddress: 
 *              type: string
 *              description: Email Address
 *          passwowrd:
 *              type: string
 *              description: Password
 *       example:
 *          emailAddress: "s.bhupender2401@gmail.com"
 *          password: "minto"
 */

const router = Router()


router.post('/signin', signIn)
/**
 * @swagger
 * /auth/signin:
 *   post:
 *     summary: Login 
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Successfull Login
 *         content:
 *           application/json:
 *             $ref: '#/components/schemas/User'
 *       401: 
 *          description: Username/Password Incorrect
 *       400:
 *          description: Invalid input
 *       500:
 *         description: Some server error
 *
 */
router.post('/signup', signUp)

router.get('/logout', loggout)
/**
 * @swagger
 * /auth/logout:
 *   get:
 *     summary: Logout 
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Successfull Logout
 *         content:
 *           application/json:
 *             $ref: '#/components/schemas/User'
 *       400:
 *          description: Invalid input
 *       500:
 *         description: Some server error
 *
 */

module.exports = router