const { error } = require('console')
const File = require('../models/file')
const path = require('path')

exports.newFile = async (req, res) => {

    try
    {
        const {
            filename,
            path,
            mimetype
        } = req.file
        const filepath = path.split("\\")

        const file = new File({
            fileName: filename,
            fileType: mimetype,
            filePath: `${filepath[filepath.length - 2]}/${filepath[filepath.length - 1]}`,
            uploadedBy: req.auth._id
        })

        const response = await file.save()

        res.status(201).json({
            success: true,
            message: 'File Uplaoded',
            dbRes: response
        })
    }
    catch(err)
    {
        res.status(400).json({
            error: true,
            message: 'An Unexpected Error Occured',
            errorJson: err,
            errorString: err.toString()
        })
    }
}

exports.getFile = async (req, res) => {
    try
    {
       
        console.log(req.auth)
        const {
            fileId
        } = req.params

        const response = await File.findOne({ _id: fileId })
        if(req.auth.user.role === 'ADMIN' || req.auth._id === response.uploadedBy.toString()) 
            return res.status(200).sendFile(path.join(__dirname, '..', response.filePath))

        res.status(401).json({
            error: true,
            message: 'You are not authorized'
        })
    }
    catch(err)
    {
        res.status(400).json({
            error: true,
            message: 'An Unexpected Error Occured',
            errorJson: err,
            errorString: err.toString()
        })
    }
}