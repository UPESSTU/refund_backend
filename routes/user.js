const { Router } = require('express')
const { getProfile, getUserById, updateStudent } = require('../controllers/user')
const { 
    checkJwt,
    checkAuthentication,
    checkAdmin,
    checkStudent
 } = require('../middlewares/auth')

const router = Router()
/**
 * @swagger   
 * components:
 *   schemas:
 *     User:
 *       type: object
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

// router.post('/student/update', checkJwt, checkAuthentication, checkStudent, updateStudent)

router.get('/profile', checkJwt, checkAuthentication, getProfile)
/**
 * @swagger
 * /user/profile:
 *   get:
 *     summary: Get User Profile
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile Fetch
 *         content:
 *           application/json:
 *             $ref: '#/components/schemas/User'
 *       401:
 *          description: Unauthorized Access
 * 
 *       400:
 *          description: Invalid input
 *       500:
 *         description: Some server error
 *
 */
router.get('/profile/:userId', checkAuthentication, checkAdmin, getUserById)
/**
 * @swagger
 * /user/profile/{userId}:
 *   get:
 *     summary: Get User Profile By Id
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: The ID of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Profile Fetch
 *         content:
 *           application/json:
 *             $ref: '#/components/schemas/User'
 *       401:
 *          description: Unauthorized Access
 * 
 *       400:
 *          description: Invalid input
 *       500:
 *         description: Some server error
 *
 */



module.exports = router