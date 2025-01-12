const User = require('../models/user')
const logger = require('../utils/logger')



exports.getUserBy_id = async (userId) => {

    try{

        let user = await User
                    .findOne({ _id: userId })
                    .select("-salt -encpy_password -createdAt -updatedAt")

        if(!user)
            return null

        return user

    }catch(err) {
        logger.error(`Error: ${err.toString()}`)
        return null

    }
}

exports.getUserById = async (req, res) => {
    try {

        const userId = req.params.userId

        let user = await this.getUserBy_id(userId)


        if(!user)
            return res.status(404).json({
                error: true,
                message: 'Content Not Found!'
            })
        logger.info(`User Fetched With ID: ${user._id}`)
        res.json({
            success: true,
            message: "User Fetched!",
            dbRes: user
        })

    }catch(err) {

        logger.error(`Error: ${err.toString()}`)
        res.status(400).json({
            error: true,
            message: "An Unexpected Error Occurrred",
            errorJSON: err,
            errorString: err.toString()
        })
        
    }
}

exports.getProfile = async (req, res) => {

    try {

        const userId = req.auth._id

        let user = await this.getUserBy_id(userId)

        if(!user)
            return res.status(404).json({
                error: true,
                message: 'Content Not Found!'
            })

        logger.info(`Profile With ID: ${user._id} Viewd`)
        res.json({
            success: true,
            message: "User Fetched!",
            dbRes: user
        })

    }catch(err) {
        logger.error(`Error: ${err.toString()}`)
        return res.status(400).json({
            error: true,
            message: "An Unexpected Error Occurrred",
            errorJSON: err,
            errorString: err.toString()
        })
        
    }
}

exports.updateStudent = async (req, res) => {
    try {

        const userId = req.auth._id

        const {
            dateOfBirth,
            adhaarNumber,
            apaarId,
            programName,
            contactNumber
        } = req.body

        if(adhaarNumber === "" || !adhaarNumber)
            return res.status(400).json({
                error: true,
                message: "An Unexpected Error Occurrred",
            })

        if(apaarId === "" || !apaarId)
            return res.status(400).json({
                error: true,
                message: "An Unexpected Error Occurrred",
            })
            
        if(dateOfBirth === "" || !dateOfBirth)
            return res.status(400).json({
                error: true,
                message: "An Unexpected Error Occurrred",
            })
        if(contactNumber === "" || !contactNumber)
            return res.status(400).json({
                error: true,
                message: "An Unexpected Error Occurrred",
            })

        const date = new Date(dateOfBirth)
        const unixTimestamp = Math.floor(date.getTime() / 1000)

        let response = await User.updateOne(
            {
                _id: userId
            },
            {
                adhaarNumber: adhaarNumber,
                apaarId: apaarId,
                dateOfBirth: unixTimestamp,
                programName: programName,
                contactNumber: contactNumber
            },
            {
                new: true
            }
        )

        response.salt = undefined
        response.encpy_password = undefined
        logger.info(`User Updated With ID: ${req.auth._id} Body Data: ${JSON.stringify(req.body)}`)
       
        res.json({
            success: true,
            message: "Update Done!",
            dbRes: response
        })

    }catch(err) {
        logger.error(`Error: ${err.toString()}`)
        return res.status(400).json({
            error: true,
            message: "An Unexpected Error Occurrred",
            errorJSON: err,
            errorString: err.toString()
        })
        
    }
}

