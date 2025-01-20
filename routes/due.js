const { Router } = require('express')

const { 
    checkAdmin,
    checkStudent,
    checkJwt,
    checkAuthentication
} = require('../middlewares/auth')

const { 
    createDue, 
    getDueById, 
    getDue, 
    updateDueStudent,
    updateDueAdmin,
    getAllDues,
    uploadDueCsvData
} = require('../controllers/due')

const { upload } = require('../utils/upload')

/**
 * @swagger   
 * components:
 *   schemas:
 *     Due:
 *       type: object
 *       required:
 *         - file
 *       properties:
 *          file: 
 *              type: file
 *              description: File To Be Uploaded
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

const router = Router()

router.post('/upload-csv', upload.single('file'), checkJwt, checkAuthentication, checkAdmin, uploadDueCsvData)
/**
 * @swagger
 * /due/upload-csv:
 *   post:
 *     summary: CSV Upload Due
 *     tags: [Due]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/File'
 *     responses:
 *       201:
 *         description: Successfull CSV Upload
 *         content:
 *           application/json:
 *             $ref: '#/components/schemas/User'
 *       401:
 *          description: Unauthorized Access
 *       400:
 *          description: Invalid input
 *       500:
 *         description: Some server error
 *
 */

router.post('/create', checkStudent, createDue)
/**
 * @swagger
 * /due/create:
 *   post:
 *     summary: Create Due
 *     tags: [Due]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               libraryDue:
 *                 type: string
 *                 description: YES / NO String
 *               financeDue:
 *                 type: string
 *                 description: YES / NO String
 *               documentDue:
 *                 type: string
 *                 description: YES / NO String
 *               hostelDue:
 *                 type: string
 *                 description: YES / NO String
 *               transportDue:
 *                 type: string
 *                 description: YES / NO String
 *               csdOfferLetterDue:
 *                 type: string
 *                 description: YES / NO String
 *               sdlDue:
 *                 type: string
 *                 description: YES / NO String
 *               alumniRegistrationDue:
 *                 type: string
 *                 description: YES / NO String
 *     responses:
 *       201:
 *         description: Successful Creation
 *       401:
 *         description: Unauthorized Access
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Some server error
 */

router.put('/student-due-update', checkStudent, updateDueStudent)
/**
 * @swagger
 * /due/student-due-update:
 *   put:
 *     summary: Update Due
 *     tags: [Due]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               libraryDue:
 *                 type: string
 *                 description: YES / NO String (optional)
 *               financeDue:
 *                 type: string
 *                 description: YES / NO String (optional)
 *               documentDue:
 *                 type: string
 *                 description: YES / NO String (optional)
 *               hostelDue:
 *                 type: string
 *                 description: YES / NO String (optional)
 *               transportDue:
 *                 type: string
 *                 description: YES / NO String (optional)
 *               csdOfferLetterDue:
 *                 type: string
 *                 description: YES / NO String (optional)
 *               sdlDue:
 *                 type: string
 *                 description: YES / NO String (optional)
 *               alumniRegistrationDue:
 *                 type: string
 *                 description: YES / NO String (optional)
 *     responses:
 *       200:
 *         description: Successful Update
 *       401:
 *         description: Unauthorized Access
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Some server error
 */

router.put('/admin-due-update', checkAdmin, updateDueAdmin)
/**
 * @swagger
 * /due/admin-due-update:
 *   put:
 *     summary: Admin Update Due
 *     tags: [Due]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               libraryDue:
 *                 type: string
 *                 description: YES / NO String (optional)
 *               financeDue:
 *                 type: string
 *                 description: YES / NO String (optional)
 *               documentDue:
 *                 type: string
 *                 description: YES / NO String (optional)
 *               hostelDue:
 *                 type: string
 *                 description: YES / NO String (optional)
 *               transportDue:
 *                 type: string
 *                 description: YES / NO String (optional)
 *               csdOfferLetterDue:
 *                 type: string
 *                 description: YES / NO String (optional)
 *               sdlDue:
 *                 type: string
 *                 description: YES / NO String (optional)
 *               alumniRegistrationDue:
 *                 type: string
 *                 description: YES / NO String (optional)
 *               libraryRemark:
 *                 type: string
 *                 description: Remark for library dues (optional)
 *               financeRemark:
 *                 type: string
 *                 description: Remark for finance dues (optional)
 *               documentRemark:
 *                 type: string
 *                 description: Remark for document dues (optional)
 *               hostelRemark:
 *                 type: string
 *                 description: Remark for hostel dues (optional)
 *               transportRemark:
 *                 type: string
 *                 description: Remark for transport dues (optional)
 *               csdOfferLetterRemark:
 *                 type: string
 *                 description: Remark for CSD offer letter dues (optional)
 *               sdlRemark:
 *                 type: string
 *                 description: Remark for SDL dues (optional)
 *               alumniRegistrationRemark:
 *                 type: string
 *                 description: Remark for alumni registration dues (optional)
 *               studentId:
 *                 type: string
 *                 description: ID of the student (optional)
 *     responses:
 *       200:
 *         description: Successful Update
 *       401:
 *         description: Unauthorized Access
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Some server error
 */

router.get('/dues', checkAdmin, getAllDues)
/**
 * @swagger
 * /due/dues:
 *   get:
 *     summary:  Get All Dues ( ADMIN )
 *     tags: [Due]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns Dues
 *       401:
 *          description: Unauthorized Access
 *       400:
 *          description: Invalid input
 *       500:
 *         description: Some server error
 *
 */

router.get('/due', checkStudent, getDue)
/**
 * @swagger
 * /due/due:
 *   get:
 *     summary:  Get Due
 *     tags: [Due]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns Due
 *       401:
 *          description: Unauthorized Access
 *       400:
 *          description: Invalid input
 *       500:
 *         description: Some server error
 *
 */
router.get('/due/:studentId', checkAdmin, getDueById)
/**
 * @swagger
 * /due/due/{studentId}:
 *   get:
 *     summary: Get Due By Id 
 *     tags: [Due]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: studentId
 *         in: path
 *         required: true
 *         description: The ID of the student
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns due
 *       401:
 *          description: Unauthorized Access
 *       400:
 *          description: Invalid input
 *       500:
 *         description: Some server error
 *
 */
module.exports = router