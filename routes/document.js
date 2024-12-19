const { Router } = require('express')

const { 
    checkAdmin,
    checkStudent
} = require('../middlewares/auth')

const { createDocument, getDocuments, getDocumentsById, updateDocumentStudent, updateDocumentAdmin, getAllDocuments } = require('../controllers/document')

const router = Router()


router.post('/create', checkStudent, createDocument)
/**
 * @swagger
 * /document/create:
 *   post:
 *     summary: Create Document
 *     tags: [Document]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               student:
 *                 type: string
 *                 description: ID of the student
 *               passportPhoto:
 *                 type: string
 *                 description: File ID of the passport photo
 *               classTenMarksheet:
 *                 type: string
 *                 description: File ID of the class 10 marksheet
 *               studentSignature:
 *                 type: string
 *                 description: File ID of the student signature
 *               adhaarCardFront:
 *                 type: string
 *                 description: File ID of the Aadhaar card front
 *               adhaarCardBack:
 *                 type: string
 *                 description: File ID of the Aadhaar card back
 *               gazetteNotification:
 *                 type: string
 *                 description: File ID of the gazette notification
 *               gazetteNotificationSerial:
 *                 type: string
 *                 description: Serial number for the gazette notification
 *               notarizeAffidavit:
 *                 type: string
 *                 description: File ID of the notarized affidavit
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

router.get('/document', checkStudent, getDocuments)
/**
 * @swagger
 * /document/document:
 *   get:
 *     summary:  Get Document
 *     tags: [Document]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns Document
 *       401:
 *          description: Unauthorized Access
 *       400:
 *          description: Invalid input
 *       500:
 *         description: Some server error
 *
 */

router.get('/documents', checkAdmin, getAllDocuments)
/**
 * @swagger
 * /document/documents:
 *   get:
 *     summary:  Get All Documents ( ADMIN )
 *     tags: [Document]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns Documents
 *       401:
 *          description: Unauthorized Access
 *       400:
 *          description: Invalid input
 *       500:
 *         description: Some server error
 *
 */

router.get('/document/:studentId',checkAdmin, getDocumentsById)
/**
 * @swagger
 * /document/document/{documentId}:
 *   get:
 *     summary: Get Document by ID
 *     tags: [Document]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: documentId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the document
 *     responses:
 *       200:
 *         description: Successfully retrieved the document
 *       401:
 *         description: Unauthorized Access
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Document not found
 *       500:
 *         description: Some server error
 */


router.put('/update-admin', checkAdmin, updateDocumentAdmin)

/**
 * @swagger
 * /document/update-admin:
 *   put:
 *     summary: Admin Update Document Remarks
 *     tags: [Document]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               passportPhoto:
 *                 type: string
 *                 description: Remarks for passport photo (optional)
 *               classTenMarksheet:
 *                 type: string
 *                 description: Remarks for class 10 marksheet (optional)
 *               studentSignature:
 *                 type: string
 *                 description: Remarks for student signature (optional)
 *               adhaarCardFront:
 *                 type: string
 *                 description: Remarks for Aadhaar card front (optional)
 *               adhaarCardBack:
 *                 type: string
 *                 description: Remarks for Aadhaar card back (optional)
 *               gazetteNotification:
 *                 type: string
 *                 description: Remarks for gazette notification (optional)
 *               notarizeAffidavit:
 *                 type: string
 *                 description: Remarks for notarized affidavit (optional)
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

router.put('/update-student',checkStudent, updateDocumentStudent)
/**
 * @swagger
 * /document/update-student:
 *   put:
 *     summary: Student Update Document
 *     tags: [Document]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               passportPhoto:
 *                 type: string
 *                 description: File ID of the passport photo (optional)
 *               classTenMarksheet:
 *                 type: string
 *                 description: File ID of the class 10 marksheet (optional)
 *               studentSignature:
 *                 type: string
 *                 description: File ID of the student signature (optional)
 *               adhaarCardFront:
 *                 type: string
 *                 description: File ID of the Aadhaar card front (optional)
 *               adhaarCardBack:
 *                 type: string
 *                 description: File ID of the Aadhaar card back (optional)
 *               gazetteNotification:
 *                 type: string
 *                 description: File ID of the gazette notification (optional)
 *               notarizeAffidavit:
 *                 type: string
 *                 description: File ID of the notarized affidavit (optional)
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


module.exports = router