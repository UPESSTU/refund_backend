const Due = require('../models/due')
const logger = require('../utils/logger')

exports.createDue = async (req, res) => {
    try
    {
        const {
            libraryDue,
            financeDue,
            documentDue,
            hostelDue,
            transportDue,
            csdOfferLetterDue,
            sdlDue,
            alumniRegistrationDue
        } = req.body
        if(!(libraryDue && financeDue && documentDue && hostelDue && transportDue && csdOfferLetterDue && sdlDue && alumniRegistrationDue))
            return res.status(400).json({
                error: true,
                message: 'An Unexpected Error Occured'
            })

        const due = new Due({
            student: req.auth._id,
            libraryDue,
            financeDue,
            documentDue,
            hostelDue,
            transportDue,
            csdOfferLetterDue,
            sdlDue,
            alumniRegistrationDue
        })

        const response = await due.save()

        res.status(201).json({
            success: true,
            message: 'Due Created',
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

exports.getDue = async (req, res) => {
    try
    {
        const response = await Due.findOne({ 
            student: req.auth._id 
        }).populate('student', '-salt -encpy_password -adhaarNumber -apaarId')

        if(!response)
            return res.status(404).json({
                error: true,
                message: 'Due Not Found'
            })
        res.status(200).json({
            success: true,
            message: 'Due Fetched',
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

exports.getAllDues = async (req, res) => {
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
        
        const response = await Due.paginate({  }, options)
        if(!response)
            return res.status(404).json({
                error: true,
                message: 'Dues Not Found'
            })

        res.status(200).json({
            success: true,
            message: 'Dues Fetched',
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


exports.getDueById = async (req, res) => {
    try
    {
        const response = await Due.findOne({ 
            student: req.params.studentId.toString()
        }).populate('student', '-salt -encpy_password -adhaarNumber -apaarId')

        if(!response)
            return res.status(404).json({
                error: true,
                message: 'Due Not Found'
            })
        res.status(200).json({
            success: true,
            message: 'Due Fetched',
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

exports.updateDueStudent = async (req, res) => {
    try
    {
        const {
            libraryDue,
            financeDue,
            documentDue,
            hostelDue,
            transportDue,
            csdOfferLetterDue,
            sdlDue,
            alumniRegistrationDue,
        } = req.body
        const studentId = req.auth._id.toString()
        const update = {}

        libraryDue ? update.libraryDue = libraryDue : null
        financeDue ? update.financeDue = financeDue : null
        documentDue ? update.documentDue = documentDue : null
        hostelDue ? update.hostelDue = hostelDue : null
        transportDue ? update.transportDue = transportDue : null
        csdOfferLetterDue ? update.csdOfferLetterDue = csdOfferLetterDue : null
        sdlDue ? update.sdlDue = sdlDue : null
        alumniRegistrationDue ? update.alumniRegistrationDue = alumniRegistrationDue : null

        

        const response = await Due.findOneAndUpdate(
            {
                student: studentId
            },
            update,
            {
                new: true
            }
        )
       
        res.status(200).json({
            success: true,
            message: 'Due Updated By Student!',
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

exports.updateDueAdmin = async (req, res) => {
    try
    {
        console.log(req.body);
        const {
            libraryDue,
            financeDue,
            documentDue,
            hostelDue,
            transportDue,
            csdOfferLetterDue,
            sdlDue,
            sdlStatus,
            sdlRemark,
            alumniRegistrationDue,
            libraryRemark,
            financeRemark,
            documentRemark,
            hostelRemark,
            transportRemark,
            csdOfferLetterRemark,
          
            alumniRegistrationRemark,
            studentId,
            hostelStatus,
            financeStatus,
            libraryStatus,
            documentStatus,
            transportStatus,
            csdOfferLetterStatus,
            alumniRegistrationStatus
        } = req.body[0]

        const update = {}
        console.log(studentId);

        libraryDue ? update.libraryDue = libraryDue : null
        financeDue ? update.financeDue = financeDue : null
        documentDue ? update.documentDue = documentDue : null
        hostelDue ? update.hostelDue = hostelDue : null
        transportDue ? update.transportDue = transportDue : null
        csdOfferLetterDue ? update.csdOfferLetterDue = csdOfferLetterDue : null
        sdlDue ? update.sdlDue = sdlDue : null
        alumniRegistrationDue ? update.alumniRegistrationDue = alumniRegistrationDue : null

        libraryRemark ? update.libraryRemark = libraryRemark : null
        financeRemark ? update.financeRemark = financeRemark : null
        documentRemark ? update.documentRemark = documentRemark : null
        transportRemark ? update.transportRemark = transportRemark : null
        csdOfferLetterRemark ? update.csdOfferLetterRemark = csdOfferLetterRemark : null
        sdlRemark ? update.sdlRemark = sdlRemark : null
        hostelRemark ? update.hostelRemark = hostelRemark : null
        alumniRegistrationDue ? update.alumniRegistrationRemark = alumniRegistrationRemark : null

        libraryStatus ? update.libraryStatus = libraryStatus : null
        financeStatus ? update.financeStatus = financeStatus : null
        documentStatus ? update.documentStatus = documentStatus : null
        transportStatus ? update.transportStatus = transportStatus : null
        csdOfferLetterStatus ? update.csdOfferLetterStatus = csdOfferLetterStatus : null
        sdlStatus ? update.sdlStatus = sdlStatus : null
        hostelStatus ? update.hostelStatus = hostelStatus : null
        alumniRegistrationStatus ? update.alumniRegistrationStatus = alumniRegistrationStatus : null

        const response = await Due.findOneAndUpdate(
            {
                student: studentId.toString()
            },
            update,
            {
                new: true
            }
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
        console.log(err)
        res.status(400).json({
            error: true,
            message: 'An Unexpected Error Occured',
            errorJson: err,
            errorString: err.toString()
        })
    }
}