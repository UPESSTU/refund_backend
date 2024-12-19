const { populate } = require('dotenv')
const Document = require('../models/document')
const logger = require('../utils/logger')

exports.createDocument = async (req, res) => {
    try
    {
        const {
            passportPhoto,
            classTenMarksheet,
            studentSignature,
            adhaarCardFront,
            adhaarCardBack,
            gazetteNotification,
            gazetteNotificationSerial,
            notarizeAffidavit
        } = req.body

        if(!(passportPhoto && classTenMarksheet && studentSignature && adhaarCardBack && adhaarCardFront && gazetteNotification && gazetteNotificationSerial && notarizeAffidavit))
            return res.status(400).json({
                error: true,
                message: 'An Unexpected Error Occured'
            })
        const doc = { 
            student: req.auth._id,
            gazetteNotificationSerial: gazetteNotificationSerial
        }

        passportPhoto ? doc.passportPhoto = { file: passportPhoto } : null
        classTenMarksheet ? doc.classTenMarksheet = { file: classTenMarksheet } : null
        studentSignature ? doc.studentSignature = { file: studentSignature } : null
        adhaarCardFront ? doc.adhaarCardFront = { file: adhaarCardFront } : null
        adhaarCardBack ? doc.adhaarCardBack = { file: adhaarCardBack } : null
        gazetteNotification ? doc.gazetteNotification = { file: gazetteNotification } : null
        notarizeAffidavit ? doc.notarizeAffidavit = { file: notarizeAffidavit } : null

        const document = new Document(doc)

        const response = await document.save()

        res.status(201).json({
            success: true,
            message: 'Document Created',
            dbRes: response
        })
    }
    catch(err) 
    {
        logger.error(`Error: ${err.toString()}`)
        res.status(400).json({
            error: true,
            message: 'An Unexpected Error Occured',
            errorJson: err,
            errorString: err.toString()
        })
    }
}

exports.getAllDocuments = async (req, res) => {
    try
    {
        const {
            page,
            limit
        } = req.query
        const options = {
            page: page ? page : 1,
            limit: limit ? limit : 10,
            sort: { sapId: 1, schoolName: 1 },
            select: '_id createdAt updatedAt',
            populate: {
                path: 'student',
                select: 'firstName lastName sapId emailAddress schoolName programName batch'
            },
        }
        
        const response = await Document.paginate({  }, options)
        if(!response)
            return res.status(404).json({
                error: true,
                message: 'Documents Not Found'
            })

        res.status(200).json({
            success: true,
            message: 'Documents Fetched',
            dbRes: response
        })
    }
    catch(err) 
    {
        logger.error(`Error: ${err.toString()}`)
        res.status(400).json({
            error: true,
            message: 'An Unexpected Error Occured',
            errorJson: err,
            errorString: err.toString()
        })
    }
}

exports.getDocuments = async (req, res) => {
    try
    {
        const response = await Document.findOne({ 
            student: req.auth._id 
        }).populate(
            'student passportPhoto.file studentSignature.file classTenMarksheet.file gazetteNotification.file adhaarCardFront.file adhaarCardBack.file notarizeAffidavit.file', 
            '-salt -encpy_password -adhaarNumber -apaarId -filePath -fileName'
        )

        if(!response)
            return res.status(404).json({
                error: true,
                message: 'Document Not Found'
            })
        res.status(200).json({
            success: true,
            message: 'Document Fetched',
            dbRes: response
        })
    }
    catch(err) 
    {
        logger.error(`Error: ${err.toString()}`)
        res.status(400).json({
            error: true,
            message: 'An Unexpected Error Occured',
            errorJson: err,
            errorString: err.toString()
        })
    }
}

exports.getDocumentsById = async (req, res) => {
    try
    {
        const response = await Document.findOne({ 
            student: req.params.studentId.toString()
        }).populate(
            'student passportPhoto.file studentSignature.file classTenMarksheet.file gazetteNotification.file adhaarCardFront.file adhaarCardBack.file notarizeAffidavit.file', 
            '-salt -encpy_password -adhaarNumber -apaarId -filePath -fileName'
        )
        if(!response)
            return res.status(404).json({
                error: true,
                message: 'Document Not Found'
            })
        res.status(200).json({
            success: true,
            message: 'Document Fetched',
            dbRes: response
        })
    }
    catch(err) 
    {
        logger.error(`Error: ${err.toString()}`)
        res.status(400).json({
            error: true,
            message: 'An Unexpected Error Occured',
            errorJson: err,
            errorString: err.toString()
        })
    }
}

exports.updateDocumentStudent = async (req, res) => {
    try
    {
        const {
            passportPhoto,
            classTenMarksheet,
            studentSignature,
            adhaarCardFront,
            adhaarCardBack,
            gazetteNotification,
            gazetteNotificationSerial,
            notarizeAffidavit,
        } = req.body
        const studentId = req.auth._id
        const doc = {        }

        passportPhoto ? doc.passportPhoto = { file: passportPhoto } : null
        classTenMarksheet ? doc.classTenMarksheet = { file: classTenMarksheet } : null
        studentSignature ? doc.studentSignature = { file: studentSignature } : null
        adhaarCardFront ? doc.adhaarCardFront = { file: adhaarCardFront } : null
        adhaarCardBack ? doc.adhaarCardBack = { file: adhaarCardBack } : null
        gazetteNotification ? doc.gazetteNotification = { file: gazetteNotification } : null
        notarizeAffidavit ? doc.notarizeAffidavit = { file: notarizeAffidavit } : null
        gazetteNotificationSerial ? doc.gazetteNotificationSerial = gazetteNotificationSerial : null



        const response = await Document.findOneAndUpdate(
            {
                student: studentId.toString()
            },
            doc,
            {
                new: true
            }
        ).populate(
            'student passportPhoto.file studentSignature.file classTenMarksheet.file gazetteNotification.file adhaarCardFront.file adhaarCardBack.file notarizeAffidavit.file', 
            '-salt -encpy_password -adhaarNumber -apaarId -filePath -fileName'
        )
       
        res.status(200).json({
            success: true,
            message: 'Document Updated By Student!',
            dbRes: response
        })
    }
    catch(err) 
    {
        logger.error(`Error: ${err.toString()}`)
        res.status(400).json({
            error: true,
            message: 'An Unexpected Error Occured',
            errorJson: err,
            errorString: err.toString()
        })
    }
}

exports.updateDocumentAdmin = async (req, res) => {
    try
    {
        const {
            passportPhoto,
            classTenMarksheet,
            studentSignature,
            adhaarCardFront,
            adhaarCardBack,
            gazetteNotification,
            notarizeAffidavit,
            studentId
        } = req.body

        const doc = {}

        passportPhoto ? doc.passportPhoto = { remarks: passportPhoto } : null
        classTenMarksheet ? doc.classTenMarksheet = { remarks: classTenMarksheet } : null
        studentSignature ? doc.studentSignature = { remarks: studentSignature } : null
        adhaarCardFront ? doc.adhaarCardFront = { remarks: adhaarCardFront } : null
        adhaarCardBack ? doc.adhaarCardBack = { remarks: adhaarCardBack } : null
        gazetteNotification ? doc.gazetteNotification = { remarks: gazetteNotification } : null
        notarizeAffidavit ? doc.notarizeAffidavit = { remarks: notarizeAffidavit } : null

        const response = await Document.findOneAndUpdate(
            {
                student: studentId.toString(),

            },
            doc,
            {
                new: true
            }
        ).populate(
            'student passportPhoto.file studentSignature.file classTenMarksheet.file gazetteNotification.file adhaarCardFront.file adhaarCardBack.file notarizeAffidavit.file', 
            '-salt -encpy_password -adhaarNumber -apaarId -filePath -fileName'
        )

       
        res.status(200).json({
            success: true,
            message: 'Due Updated By Admin',
            dbRes: response
        })
    }
    catch(err) 
    {
        logger.error(`Error: ${err.toString()}`)
        res.status(400).json({
            error: true,
            message: 'An Unexpected Error Occured',
            errorJson: err,
            errorString: err.toString()
        })
    }
}