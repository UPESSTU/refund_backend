const { Router } = require('express')

const { 
    checkJwt,
    checkAuthentication,
    checkStudent,
    checkAdmin,
} = require('../middlewares/auth')


/**
 * @swagger   
 * components:
 *   schemas:
 *     File:
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

const { upload } = require('../utils/upload')
const { newFile, getFile } = require('../controllers/file')

const router = Router()

router.post('/upload', upload.single('file'), newFile)
/**
 * @swagger
 * /file/upload:
 *   post:
 *     summary: File Upload 
 *     tags: [File]
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
 *         description: Successfull Upload
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
router.get('/file/:fileId', getFile)
/**
 * @swagger
 * /file/file/{fileId}:
 *   get:
 *     summary: File Get 
 *     tags: [File]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: fileId
 *         in: path
 *         required: true
 *         description: The ID of the file to download
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfull Download
 *       401:
 *          description: Unauthorized Access
 *       400:
 *          description: Invalid input
 *       500:
 *         description: Some server error
 *
 */

module.exports = router